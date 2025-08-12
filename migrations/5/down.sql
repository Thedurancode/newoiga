
-- Remove Carnegie Hall and La Boom NY events
DELETE FROM events WHERE title IN (
  'The New York Mariachi Spectacular', 'Kris La K Live', 'Jessi Uribe en Concierto', 
  'Damas Gratis', 'Segundo Rocero & Francis', 'Perreo en Exceso! Randy & DJ Adonii',
  'Cosculluela USA Tour 2025', 'Charlie Zaa - Exclusivo Única Presentación', 'MWC Worldwide Lucha Libre'
);
