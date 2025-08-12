
-- Insert events from the Zamora Live events list
INSERT INTO events (title, description, venue_id, start_date_time, price, is_featured, created_at, updated_at) VALUES
-- Palma Verde events
('R&B Party', 'Smooth R&B vibes and soulful music for a perfect night out', 
 (SELECT id FROM venues WHERE name = 'Palma Verde'), 
 '2025-07-18 20:00:00', 25.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Melanin and Mimosas Brunch', 'Celebrating culture and community with delicious brunch and mimosas', 
 (SELECT id FROM venues WHERE name = 'Palma Verde'), 
 '2025-08-09 12:00:00', 35.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('SoHo Southern Party', 'Southern hospitality meets NYC style in this amazing party', 
 (SELECT id FROM venues WHERE name = 'Palma Verde'), 
 '2025-07-19 21:00:00', 30.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('SPMS New York Event', 'Special networking and entertainment event', 
 (SELECT id FROM venues WHERE name = 'Palma Verde'), 
 '2025-07-24 19:00:00', 40.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Dramma events
('V5 Reggaeton Nights', 'The hottest reggaeton beats and Latin vibes', 
 (SELECT id FROM venues WHERE name = 'Dramma'), 
 '2025-07-19 22:00:00', 20.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('El Torito Press Conference', 'Exclusive press event with special announcements', 
 (SELECT id FROM venues WHERE name = 'Dramma'), 
 '2025-07-22 18:00:00', NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Women''s Empowerment Event', 'Inspiring women through networking, speakers, and celebration', 
 (SELECT id FROM venues WHERE name = 'Dramma'), 
 '2025-07-24 17:00:00', 15.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Taqueria events
('Taco Tuesday', 'Weekly celebration of authentic Mexican tacos and flavors', 
 (SELECT id FROM venues WHERE name = 'Taqueria'), 
 '2025-08-12 18:00:00', 12.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Cantina events
('AYCE Tacos', 'All-you-can-eat taco extravaganza every Tuesday', 
 (SELECT id FROM venues WHERE name = 'Cantina'), 
 '2025-08-12 19:00:00', 25.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Cantina After Dark', 'Late night entertainment with drinks and dancing', 
 (SELECT id FROM venues WHERE name = 'Cantina'), 
 '2025-08-08 22:00:00', 15.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Brunch Fiesta', 'Weekend brunch celebration with Mexican flavors and cocktails', 
 (SELECT id FROM venues WHERE name = 'Cantina'), 
 '2025-08-09 11:00:00', 28.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- HK Hall events
('Rancho Y Galope', 'Traditional folk celebration with music and dancing', 
 (SELECT id FROM venues WHERE name = 'HK Hall'), 
 '2025-07-26 19:00:00', 22.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Rancho Y Galope', 'Traditional folk celebration with music and dancing', 
 (SELECT id FROM venues WHERE name = 'HK Hall'), 
 '2025-08-30 19:00:00', 22.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Bingo Loco', 'High-energy bingo night with amazing prizes and entertainment', 
 (SELECT id FROM venues WHERE name = 'HK Hall'), 
 '2025-07-25 20:00:00', 18.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Bingo Loco', 'High-energy bingo night with amazing prizes and entertainment', 
 (SELECT id FROM venues WHERE name = 'HK Hall'), 
 '2025-08-08 20:00:00', 18.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Bingo Loco', 'High-energy bingo night with amazing prizes and entertainment', 
 (SELECT id FROM venues WHERE name = 'HK Hall'), 
 '2025-08-29 20:00:00', 18.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
