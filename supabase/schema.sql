-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- EVENTS TABLE
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  budget NUMERIC,
  status TEXT DEFAULT 'planning', -- planning, confirmed, completed
  user_id UUID -- For RLS if we had auth, optional for hackathon demo
);

-- TASKS TABLE
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, in_progress, done
  agent_name TEXT, -- which agent is handling this
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RSVPS TABLE
CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'attending', -- attending, declined, maybe
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MOCK VENUES (Read-only for agents)
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  capacity INTEGER,
  cost NUMERIC,
  location TEXT,
  amenities TEXT[],
  image_url TEXT
);

-- MOCK CATERING (Read-only for agents)
CREATE TABLE catering_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT, -- vegan, bbq, italian, etc.
  cost_per_person NUMERIC,
  menu_items TEXT[]
);

-- INSERT MOCK DATA FOR VENUES
INSERT INTO venues (name, capacity, cost, location, amenities, image_url) VALUES
('TechHub Lagos', 100, 500, 'Lagos, Nigeria', ARRAY['WiFi', 'Projector', 'Coffee'], 'https://images.unsplash.com/photo-1497366216548-37526070297c'),
('Innovation Center', 50, 300, 'Lagos, Nigeria', ARRAY['WiFi', 'Whiteboard'], 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4'),
('Grand Hall', 500, 2000, 'Lagos, Nigeria', ARRAY['Stage', 'Sound System', 'Banquet'], 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3');

-- INSERT MOCK DATA FOR CATERING
INSERT INTO catering_options (name, type, cost_per_person, menu_items) VALUES
('Mama Put Delight', 'Local', 15, ARRAY['Jollof Rice', 'Fried Plantain', 'Chicken']),
('Healthy Bites', 'Vegan', 20, ARRAY['Quinoa Salad', 'Fruit Platter', 'Smoothies']),
('Pizza Party', 'Italian', 12, ARRAY['Pepperoni', 'Margherita', 'Garlic Bread']);

-- ENABLE REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE events;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE rsvps;
