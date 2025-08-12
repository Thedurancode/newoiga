import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono<{ Bindings: Env }>();

// Venue validation schema
const CreateVenueSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  image_url: z.string().url().optional(),
  logo_url: z.string().url().optional(),
  website: z.string().url().optional(),
  phone: z.string().optional()
});

const UpdateVenueSchema = CreateVenueSchema.partial().extend({
  id: z.number().int().positive().optional()
});

// Event validation schema
const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  venue_id: z.number().int().positive(),
  start_date_time: z.string(),
  end_date_time: z.string().optional(),
  price: z.number().positive().optional(),
  image_url: z.string().url().optional(),
  ticket_url: z.string().url().optional(),
  is_featured: z.number().int().min(0).max(1).default(0),
  is_special: z.number().int().min(0).max(1).default(0)
});

const UpdateEventSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  venue_id: z.number().int().positive().optional(),
  start_date_time: z.string().optional(),
  end_date_time: z.string().optional(),
  price: z.number().positive().optional(),
  image_url: z.string().url().optional(),
  ticket_url: z.string().url().optional(),
  is_featured: z.number().int().min(0).max(1).optional(),
  is_special: z.number().int().min(0).max(1).optional()
});

// Get all venues
app.get("/api/venues", async (c) => {
  const db = c.env.DB;
  const venues = await db.prepare("SELECT * FROM venues ORDER BY name").all();
  return c.json(venues.results);
});

// Create new venue
app.post("/api/venues", zValidator("json", CreateVenueSchema), async (c) => {
  const db = c.env.DB;
  const data = c.req.valid("json");
  
  const result = await db.prepare(`
    INSERT INTO venues (name, description, address, city, image_url, logo_url, website, phone, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `).bind(
    data.name,
    data.description || null,
    data.address || null,
    data.city || null,
    data.image_url || null,
    data.logo_url || null,
    data.website || null,
    data.phone || null
  ).run();
  
  return c.json({ id: result.meta.last_row_id, ...data });
});

// Update venue
app.put("/api/venues/:id", zValidator("json", UpdateVenueSchema), async (c) => {
  const db = c.env.DB;
  const venueId = c.req.param("id");
  const data = c.req.valid("json");
  
  // Check if venue exists and get current data
  const existingVenue = await db.prepare("SELECT * FROM venues WHERE id = ?").bind(venueId).first();
  if (!existingVenue) {
    return c.json({ error: "Venue not found" }, 404);
  }
  
  // Merge provided data with existing data to ensure all fields are present
  const updateData = {
    name: data.name ?? existingVenue.name,
    description: data.description ?? existingVenue.description,
    address: data.address ?? existingVenue.address,
    city: data.city ?? existingVenue.city,
    image_url: data.image_url ?? existingVenue.image_url,
    logo_url: data.logo_url ?? existingVenue.logo_url,
    website: data.website ?? existingVenue.website,
    phone: data.phone ?? existingVenue.phone
  };
  
  const result = await db.prepare(`
    UPDATE venues 
    SET name = ?, description = ?, address = ?, city = ?, image_url = ?, logo_url = ?, website = ?, phone = ?, updated_at = datetime('now')
    WHERE id = ?
  `).bind(
    updateData.name,
    updateData.description,
    updateData.address,
    updateData.city,
    updateData.image_url,
    updateData.logo_url,
    updateData.website,
    updateData.phone,
    venueId
  ).run();
  
  return c.json({ success: true, changes: result.meta.changes });
});

// Delete venue
app.delete("/api/venues/:id", async (c) => {
  const db = c.env.DB;
  const venueId = c.req.param("id");
  
  // Check if venue has any events
  const eventCount = await db.prepare("SELECT COUNT(*) as count FROM events WHERE venue_id = ?").bind(venueId).first();
  if (eventCount && (eventCount as any).count > 0) {
    return c.json({ error: "Cannot delete venue with existing events" }, 400);
  }
  
  const result = await db.prepare("DELETE FROM venues WHERE id = ?").bind(venueId).run();
  
  if (result.meta.changes === 0) {
    return c.json({ error: "Venue not found" }, 404);
  }
  
  return c.json({ success: true });
});

// Get single venue
app.get("/api/venues/:id", async (c) => {
  const db = c.env.DB;
  const venueId = c.req.param("id");
  
  const venue = await db.prepare("SELECT * FROM venues WHERE id = ?").bind(venueId).first();
  if (!venue) {
    return c.json({ error: "Venue not found" }, 404);
  }
  
  return c.json(venue);
});

// Get events for a venue
app.get("/api/venues/:id/events", async (c) => {
  const db = c.env.DB;
  const venueId = c.req.param("id");
  
  const events = await db.prepare(`
    SELECT e.*, v.name as venue_name 
    FROM events e 
    JOIN venues v ON e.venue_id = v.id 
    WHERE e.venue_id = ? 
    AND datetime(e.start_date_time) >= datetime('now')
    ORDER BY e.start_date_time
  `).bind(venueId).all();
  
  return c.json(events.results);
});

// Get all events (upcoming only)
app.get("/api/events", async (c) => {
  const db = c.env.DB;
  const events = await db.prepare(`
    SELECT e.*, v.name as venue_name, v.city as venue_city
    FROM events e 
    JOIN venues v ON e.venue_id = v.id 
    WHERE datetime(e.start_date_time) >= datetime('now')
    ORDER BY e.start_date_time
  `).all();
  
  return c.json(events.results);
});

// Get special events for homepage
app.get("/api/events/special", async (c) => {
  const db = c.env.DB;
  const events = await db.prepare(`
    SELECT e.*, v.name as venue_name, v.city as venue_city
    FROM events e 
    JOIN venues v ON e.venue_id = v.id 
    WHERE e.is_special = 1 
    AND datetime(e.start_date_time) >= datetime('now')
    ORDER BY e.start_date_time
    LIMIT 6
  `).all();
  
  return c.json(events.results);
});

// Get all events (admin - includes past events)
app.get("/api/events/all", async (c) => {
  const db = c.env.DB;
  const events = await db.prepare(`
    SELECT e.*, v.name as venue_name, v.city as venue_city
    FROM events e 
    JOIN venues v ON e.venue_id = v.id 
    ORDER BY e.start_date_time DESC
  `).all();
  
  return c.json(events.results);
});

// Create new event
app.post("/api/events", zValidator("json", CreateEventSchema), async (c) => {
  const db = c.env.DB;
  const data = c.req.valid("json");
  
  const result = await db.prepare(`
    INSERT INTO events (title, description, venue_id, start_date_time, end_date_time, price, image_url, ticket_url, is_featured, is_special, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `).bind(
    data.title,
    data.description || null,
    data.venue_id,
    data.start_date_time,
    data.end_date_time || null,
    data.price || null,
    data.image_url || null,
    data.ticket_url || null,
    data.is_featured,
    data.is_special
  ).run();
  
  return c.json({ id: result.meta.last_row_id, ...data });
});

// Update event
app.put("/api/events/:id", zValidator("json", UpdateEventSchema), async (c) => {
  const db = c.env.DB;
  const eventId = c.req.param("id");
  const data = c.req.valid("json");
  
  // Check if event exists and get current data
  const existingEvent = await db.prepare("SELECT * FROM events WHERE id = ?").bind(eventId).first();
  if (!existingEvent) {
    return c.json({ error: "Event not found" }, 404);
  }
  
  // Merge provided data with existing data to ensure all fields are present
  const updateData = {
    title: data.title ?? existingEvent.title,
    description: data.description ?? existingEvent.description,
    venue_id: data.venue_id ?? existingEvent.venue_id,
    start_date_time: data.start_date_time ?? existingEvent.start_date_time,
    end_date_time: data.end_date_time ?? existingEvent.end_date_time,
    price: data.price ?? existingEvent.price,
    image_url: data.image_url ?? existingEvent.image_url,
    ticket_url: data.ticket_url ?? existingEvent.ticket_url,
    is_featured: data.is_featured ?? existingEvent.is_featured,
    is_special: data.is_special ?? existingEvent.is_special
  };
  
  const result = await db.prepare(`
    UPDATE events 
    SET title = ?, description = ?, venue_id = ?, start_date_time = ?, end_date_time = ?, 
        price = ?, image_url = ?, ticket_url = ?, is_featured = ?, is_special = ?, updated_at = datetime('now')
    WHERE id = ?
  `).bind(
    updateData.title,
    updateData.description,
    updateData.venue_id,
    updateData.start_date_time,
    updateData.end_date_time,
    updateData.price,
    updateData.image_url,
    updateData.ticket_url,
    updateData.is_featured,
    updateData.is_special,
    eventId
  ).run();
  
  return c.json({ success: true, changes: result.meta.changes });
});

// Delete event
app.delete("/api/events/:id", async (c) => {
  const db = c.env.DB;
  const eventId = c.req.param("id");
  
  const result = await db.prepare("DELETE FROM events WHERE id = ?").bind(eventId).run();
  
  if (result.meta.changes === 0) {
    return c.json({ error: "Event not found" }, 404);
  }
  
  return c.json({ success: true });
});

// Get single event
app.get("/api/events/:id", async (c) => {
  const db = c.env.DB;
  const eventId = c.req.param("id");
  
  const event = await db.prepare(`
    SELECT e.*, v.name as venue_name, v.address as venue_address, v.city as venue_city, v.phone as venue_phone, v.website as venue_website, v.logo_url as venue_logo_url
    FROM events e 
    JOIN venues v ON e.venue_id = v.id 
    WHERE e.id = ?
  `).bind(eventId).first();
  
  if (!event) {
    return c.json({ error: "Event not found" }, 404);
  }
  
  return c.json(event);
});

export default app;
