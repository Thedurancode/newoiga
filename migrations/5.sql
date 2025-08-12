
-- Insert Carnegie Hall and La Boom NY events
INSERT INTO events (title, description, venue_id, start_date_time, price, is_featured, created_at, updated_at) VALUES
-- Carnegie Hall event
('The New York Mariachi Spectacular', 'World-class mariachi performance featuring traditional Mexican music and culture', 
 (SELECT id FROM venues WHERE name = 'Carnegie Hall'), 
 '2025-10-14 19:30:00', 75.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- La Boom NY events
('Kris La K Live', 'Exclusive performance by rising Latin music star Kris La K', 
 (SELECT id FROM venues WHERE name = 'La Boom NY'), 
 '2025-07-18 21:00:00', 45.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Jessi Uribe en Concierto', 'Colombian vallenato superstar live in concert', 
 (SELECT id FROM venues WHERE name = 'La Boom NY'), 
 '2025-07-19 20:00:00', 55.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Damas Gratis', 'Argentine cumbia legends perform their greatest hits', 
 (SELECT id FROM venues WHERE name = 'La Boom NY'), 
 '2025-08-08 21:00:00', 50.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Segundo Rocero & Francis', 'Dynamic duo brings high-energy Latin music and entertainment', 
 (SELECT id FROM venues WHERE name = 'La Boom NY'), 
 '2025-08-09 20:30:00', 40.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Perreo en Exceso! Randy & DJ Adonii', 'Ultimate reggaeton party with Randy and DJ Adonii', 
 (SELECT id FROM venues WHERE name = 'La Boom NY'), 
 '2025-08-15 22:00:00', 35.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Cosculluela USA Tour 2025', 'Puerto Rican rap icon Cosculluela on his exclusive USA tour', 
 (SELECT id FROM venues WHERE name = 'La Boom NY'), 
 '2025-08-23 21:00:00', 60.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Charlie Zaa - Exclusivo Única Presentación', 'Colombian romantic balladeer in an exclusive one-night performance', 
 (SELECT id FROM venues WHERE name = 'La Boom NY'), 
 '2025-09-20 20:00:00', 65.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('MWC Worldwide Lucha Libre', 'Professional wrestling spectacular featuring international luchadores', 
 (SELECT id FROM venues WHERE name = 'La Boom NY'), 
 '2025-09-20 19:00:00', 30.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
