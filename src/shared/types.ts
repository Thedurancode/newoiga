import z from "zod";

export const VenueSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  image_url: z.string().nullable(),
  logo_url: z.string().nullable(),
  website: z.string().nullable(),
  phone: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  venue_id: z.number(),
  start_date_time: z.string(),
  end_date_time: z.string().nullable(),
  price: z.number().nullable(),
  image_url: z.string().nullable(),
  ticket_url: z.string().nullable(),
  is_featured: z.number().int(),
  is_special: z.number().int(),
  created_at: z.string(),
  updated_at: z.string(),
  venue_name: z.string().optional(),
  venue_city: z.string().optional(),
  venue_address: z.string().optional(),
  venue_phone: z.string().optional(),
  venue_website: z.string().optional(),
});

export type Venue = z.infer<typeof VenueSchema>;
export type Event = z.infer<typeof EventSchema>;
