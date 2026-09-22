-- Schema for MTS Offshore Database (mtsoffshore)

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  company VARCHAR(255),
  service_interest VARCHAR(150),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  year VARCHAR(20) NOT NULL,
  location VARCHAR(255) NOT NULL,
  service VARCHAR(255) NOT NULL,
  scope TEXT NOT NULL,
  details JSONB,
  image VARCHAR(500) NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON contact_inquiries(created_at DESC);
