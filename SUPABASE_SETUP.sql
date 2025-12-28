-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  preview_url TEXT NOT NULL,
  gumroad_url TEXT NOT NULL,
  cover TEXT,
  description TEXT,
  specs JSONB,
  demos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plugins table
CREATE TABLE plugins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  gumroad_url TEXT NOT NULL,
  cover TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover TEXT,
  content TEXT NOT NULL,
  products TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_plugins_slug ON plugins(slug);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- Enable RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read access to products, plugins, and blog posts
CREATE POLICY "Public read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public read plugins" ON plugins
  FOR SELECT USING (true);

CREATE POLICY "Public read blog_posts" ON blog_posts
  FOR SELECT USING (true);

-- RLS Policies - Admin users can modify products, plugins, and blog posts
-- (You'll need to set up auth first, then add these policies)

-- Insert sample data from your current content.ts
INSERT INTO products (slug, name, price, preview_url, gumroad_url, cover, specs, description, demos) VALUES
('schranz-alpha', 'Schranz Alpha', 24, 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/schranz-alpha', 'https://picsum.photos/id/1011/1280/720', '{"bpm": "140–155", "key": "Various", "format": "WAV 24-bit", "size": "850MB", "type": "Drums & Loops"}', 'Aggressive kicks, metallic percussion and relentless loops crafted for modern hard techno and schranz.', ARRAY['https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3']),
('dna-kicks-vol1', 'DNA Kicks Vol.1', 19, 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/dna-kicks-vol1', 'https://picsum.photos/id/1015/1280/720', '{"bpm": "145–150", "key": "Various", "format": "WAV 24-bit", "size": "420MB", "type": "Kick One-Shots"}', 'Brutal, saturated kick one‑shots designed to cut through any warehouse system.', ARRAY['https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3']),
('industrial-textures', 'Industrial Textures', 22, 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/industrial-textures', 'https://picsum.photos/id/1020/1280/720', '{"bpm": "130–160", "key": "N/A", "format": "WAV 24-bit", "size": "600MB", "type": "Atmos & FX"}', 'Grainy atmospheres, machine drones and found sounds for cold, industrial aesthetics.', ARRAY['https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3']),
('rave-stabs', 'Rave Stabs', 17, 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/rave-stabs', 'https://picsum.photos/id/1025/1280/720', '{"bpm": "Any", "key": "Various", "format": "WAV 24-bit", "size": "250MB", "type": "Stabs & Shots"}', 'Oldschool rave energy with a modern aggressive twist.', ARRAY['https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3']),
('club-tools', 'Club Tools', 21, 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/club-tools', 'https://picsum.photos/id/1031/1280/720', '{"bpm": "140–150", "key": "N/A", "format": "WAV 24-bit", "size": "500MB", "type": "Utility & FX"}', 'Builders, falls, uplifters, hard fills and transitions built for damage.', ARRAY['https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3']),
('fm-kicks', 'FM Kicks', 18, 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/fm-kicks', 'https://picsum.photos/id/1035/1280/720', '{"bpm": "145–160", "key": "Various", "format": "WAV 24-bit", "size": "300MB", "type": "Kick One-Shots"}', 'Digitally fierce FM‑driven kicks with surgical transient control.', ARRAY['https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3']);

INSERT INTO plugins (slug, name, preview_url, gumroad_url, cover, description) VALUES
('kick-engine', 'Kick Engine (Rack)', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/kick-engine', 'https://picsum.photos/id/1040/1280/720', 'Powerful Max for Live rack for designing and sculpting custom hard techno kicks with real-time modulation and transient control.'),
('schranz-seq', 'Schranz Sequencer (Max)', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/schranz-seq', 'https://picsum.photos/id/1043/1280/720', 'Advanced Max for Live sequencer optimized for polyrhythmic schranz patterns and hypnotic drum arrangements.'),
('acid-303', 'ACID 303 Presets', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/acid-303', 'https://picsum.photos/id/1045/1280/720', 'Curated preset pack for Serum and Vital with aggressive acid lines and modulation chains perfect for hard techno synthesis.'),
('noise-walls', 'Noise Walls (Rack)', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/noise-walls', 'https://picsum.photos/id/1049/1280/720', 'Ableton Rack for layering grainy textures, industrial noise and evolving pads with granular processing and filtering.'),
('granular-drift', 'Granular Drift (VST)', 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', 'https://gumroad.com/l/granular-drift', 'https://picsum.photos/id/1047/1280/720', 'Ultra-modern granular processing plugin designed for evolving pads, glitchy effects and experimental hard techno sound design.');

-- Note: Blog posts need to be inserted manually or via the admin panel due to large HTML content
-- See the content.ts file for the blog post content to insert manually
