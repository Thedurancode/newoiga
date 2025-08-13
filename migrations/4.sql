-- Insert events from the provided list
INSERT INTO events (title, description, venue_id, start_date_time, end_date_time, price, is_featured, created_at, updated_at) VALUES

-- Palma Verde Events
('R&B PARTY', 'Soulful R&B party with live music and dancing', 1, '2025-07-18 20:00:00', '2025-07-19 02:00:00', 25.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MELANIN AND MIMOSAS BRUNCH', 'Weekly celebration brunch with mimosas and good vibes', 1, '2025-07-19 12:00:00', '2025-07-19 16:00:00', 35.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SOHO SOUTHERN PARTY', 'Southern-style party with music and cuisine', 1, '2025-07-19 19:00:00', '2025-07-20 01:00:00', 30.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SPMS NEW YORK EVENT', 'Special SPMS networking and entertainment event', 1, '2025-07-24 18:00:00', '2025-07-24 23:00:00', 40.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Dramma Events  
('V5 REGGAETON NIGHTS', 'High-energy reggaeton night with top DJs', 2, '2025-07-19 21:00:00', '2025-07-20 03:00:00', 20.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EL TORITO PRESS CONFERENCE', 'Official press conference and media event', 2, '2025-07-22 15:00:00', '2025-07-22 17:00:00', 0.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WOMENS EMPOWERMENT EVENT', 'Inspiring event celebrating women in business and arts', 2, '2025-07-24 17:00:00', '2025-07-24 21:00:00', 15.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Taqueria Events
('TACO TUESDAY', 'Weekly taco special with authentic Mexican flavors', 3, '2025-07-22 17:00:00', '2025-07-22 22:00:00', 12.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Cantina Events
('AYCE TACOS', 'All-you-can-eat tacos every Tuesday', 4, '2025-07-22 17:00:00', '2025-07-22 22:00:00', 25.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CANTINA AFTER DARK', 'Late night entertainment and drinks', 4, '2025-07-25 22:00:00', '2025-07-26 03:00:00', 15.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BRUNCH FIESTAS', 'Weekend brunch with live entertainment', 4, '2025-07-26 11:00:00', '2025-07-26 15:00:00', 30.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- HK Hall Events
('RANCHO Y GALOPE', 'Traditional Mexican rodeo and cultural show', 5, '2025-07-26 19:00:00', '2025-07-26 23:00:00', 35.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('RANCHO Y GALOPE', 'Traditional Mexican rodeo and cultural show', 5, '2025-08-30 19:00:00', '2025-08-30 23:00:00', 35.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BINGO LOCO', 'Crazy bingo night with prizes and entertainment', 5, '2025-07-25 19:00:00', '2025-07-25 22:00:00', 20.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BINGO LOCO', 'Crazy bingo night with prizes and entertainment', 5, '2025-08-08 19:00:00', '2025-08-08 22:00:00', 20.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BINGO LOCO', 'Crazy bingo night with prizes and entertainment', 5, '2025-08-29 19:00:00', '2025-08-29 22:00:00', 20.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Carnegie Hall Events
('THE NEW YORK MARIACHI SPECTACULAR', 'Grand mariachi performance featuring top musicians', 6, '2025-10-14 20:00:00', '2025-10-14 22:30:00', 75.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- La Boom NY Events
('KRIS LAK', 'Live performance by Kris Lak', 7, '2025-07-18 21:00:00', '2025-07-19 02:00:00', 45.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('JESSI URIBE EN CONCIERTO', 'Concert featuring Colombian singer Jessi Uribe', 7, '2025-07-19 20:00:00', '2025-07-19 23:30:00', 55.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DAMAS GRATIS', 'Special ladies night event', 7, '2025-08-08 21:00:00', '2025-08-09 02:00:00', 30.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SEGUNDO ROSERO & FRANCIS', 'Live performance by Segundo Rosero & Francis', 7, '2025-08-09 20:00:00', '2025-08-09 23:30:00', 50.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PERREO EN EXCESO! RANDY & DJ ADONII', 'High-energy reggaeton night with Randy & DJ Adonii', 7, '2025-08-15 22:00:00', '2025-08-16 03:00:00', 40.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('COSCULLUELA USA TOUR 2025', 'Cosculluela live in concert - USA Tour 2025', 7, '2025-08-23 21:00:00', '2025-08-24 01:00:00', 65.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CHARLIE ZAA EXCLUSIVO UNICA PRESENTACIÓN', 'Exclusive and unique performance by Charlie Zaa', 7, '2025-09-20 20:00:00', '2025-09-20 23:00:00', 70.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MWC WORLDWIDE LUCHA LIBRE', 'Professional wrestling event featuring international stars', 7, '2025-09-20 19:00:00', '2025-09-20 22:00:00', 35.00, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
