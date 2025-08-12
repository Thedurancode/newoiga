
-- Remove all the new events
DELETE FROM events WHERE venue_id IN (
  SELECT id FROM venues WHERE name IN ('Palma Verde', 'Dramma', 'Taqueria', 'Cantina', 'HK Hall', 'Carnegie Hall', 'La Boom NY')
);
