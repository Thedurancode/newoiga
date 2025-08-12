
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  venue_id INTEGER NOT NULL,
  start_date_time DATETIME NOT NULL,
  end_date_time DATETIME,
  price REAL,
  image_url TEXT,
  ticket_url TEXT,
  is_featured BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
