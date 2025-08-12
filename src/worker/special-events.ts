import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

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

export { app as specialEventsApp };
