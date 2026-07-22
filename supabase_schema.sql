-- ==========================================
-- COMITUPB ADMIN DATABASE SCHEMA & SEED DATA
-- Project Ref: ycdvufawexwjrqfigkxc
-- ==========================================

-- 1. DROP EXISTING TABLES IF NEEDED
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS showcases CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS divisions CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS vault_modules CASCADE;

-- 2. CREATE TABLES

-- Table: divisions
CREATE TABLE divisions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT NOT NULL DEFAULT 'Globe',
  member_count INT NOT NULL DEFAULT 0,
  head_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: members
CREATE TABLE members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  npm TEXT NOT NULL,
  division_id TEXT REFERENCES divisions(id) ON DELETE SET NULL,
  division_name TEXT,
  role TEXT NOT NULL DEFAULT 'Anggota',
  email TEXT NOT NULL,
  avatar_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('Active', 'Alumni', 'Inactive', 'Pending')) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: events
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  quota INT NOT NULL DEFAULT 0,
  registered_count INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('Open', 'Closed', 'Draft', 'Finished')) DEFAULT 'Open',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: showcases
CREATE TABLE showcases (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  division TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  demo_url TEXT,
  repo_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: contact_messages
CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: vault_modules
CREATE TABLE vault_modules (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('web', 'cyber', 'ai', 'design')),
  category_name TEXT NOT NULL,
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  duration TEXT NOT NULL,
  video_url TEXT NOT NULL,
  image_url TEXT,
  level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Beginner - Advanced')),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: org_chart_nodes
CREATE TABLE org_chart_nodes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  division TEXT NOT NULL,
  avatar_url TEXT,
  position_x FLOAT NOT NULL DEFAULT 0,
  position_y FLOAT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: org_chart_edges
CREATE TABLE org_chart_edges (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL REFERENCES org_chart_nodes(id) ON DELETE CASCADE,
  target TEXT NOT NULL REFERENCES org_chart_nodes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC READ/WRITE POLICIES (FOR ADMIN INTERACTION)
ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_chart_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_chart_edges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read/write access for divisions" ON divisions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access for members" ON members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access for events" ON events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access for showcases" ON showcases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access for contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access for vault_modules" ON vault_modules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access for org_chart_nodes" ON org_chart_nodes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access for org_chart_edges" ON org_chart_edges FOR ALL USING (true) WITH CHECK (true);

-- Seed: org_chart_nodes
INSERT INTO org_chart_nodes (id, name, role, division, avatar_url, position_x, position_y) VALUES
('node-pembina', 'Dr. H. Sukarni, M.Kom', 'Pembina Organisasi', 'Universitas Putra Bangsa', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', 380, 20),
('node-ketua', 'Ahmad Rizky Pratama', 'Ketua Umum', 'BPH ComitUPB', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 380, 170),
('node-wakil', 'Siti Nurhaliza', 'Wakil Ketua', 'BPH ComitUPB', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', 380, 320),
('node-div-web', 'Dimas Ardiansyah', 'Ketua Divisi', 'Divisi Web Development', NULL, 40, 470),
('node-div-cyber', 'Budi Santoso', 'Ketua Divisi', 'Divisi Cyber Security', NULL, 380, 470),
('node-div-mobile', 'Nadia Putri', 'Ketua Divisi', 'Divisi Mobile App', NULL, 720, 470);

-- Seed: org_chart_edges
INSERT INTO org_chart_edges (id, source, target) VALUES
('e-pembina-ketua', 'node-pembina', 'node-ketua'),
('e-ketua-wakil', 'node-ketua', 'node-wakil'),
('e-wakil-web', 'node-wakil', 'node-div-web'),
('e-wakil-cyber', 'node-wakil', 'node-div-cyber'),
('e-wakil-mobile', 'node-wakil', 'node-div-mobile');

-- 4. INSERT MOCK DATA

-- Seed: divisions
INSERT INTO divisions (id, name, slug, description, icon, member_count, head_name) VALUES
('div-web', 'Divisi Web Development', 'web-dev', 'Fokus membangun website & web apps modern berkecerdasan tinggi dan terintegrasi API.', 'Globe', 85, 'Ahmad Rizky'),
('div-cyber', 'Divisi Cyber Security', 'cyber-sec', 'Fokus pada keamanan jaringan, analisis sistem, penetration testing, dan tim CTF.', 'Shield', 45, 'Budi Santoso'),
('div-mobile', 'Divisi Mobile App', 'mobile-dev', 'Fokus pada pengembangan aplikasi Android & iOS responsif berkinerja cepat.', 'Smartphone', 50, 'Siti Nurhaliza'),
('div-ai', 'Divisi Data & AI', 'ai-data', 'Fokus pada pengolahan data, machine learning, visualisasi insight, dan otomatisasi.', 'Cpu', 40, 'Fikri Ardiansyah'),
('div-uiux', 'Divisi Creative UI/UX', 'ui-ux', 'Fokus pada desain antarmuka, riset pengalaman pengguna, dan aset grafis digital.', 'Palette', 38, 'Nadia Putri');

-- Seed: members
INSERT INTO members (id, name, npm, division_id, division_name, role, email, status) VALUES
('mem-1', 'Ahmad Rizky', '312210450', 'div-web', 'Divisi Web Development', 'Ketua Divisi', 'rizky@comitupb.org', 'Active'),
('mem-2', 'Siti Nurhaliza', '312210451', 'div-mobile', 'Divisi Mobile App', 'Ketua Divisi', 'siti@comitupb.org', 'Active'),
('mem-3', 'Dimas Pratama', '312210499', 'div-web', 'Divisi Web Development', 'Anggota', 'dimas@gmail.com', 'Active');

-- Seed: events
INSERT INTO events (id, title, category, date, location, description, quota, registered_count, status, image_url) VALUES
('evt-1', 'Workshop Modern Web Development dengan Next.js 14', 'Workshop & Bootcamp', '2026-08-15', 'Lab Komputer 3, Gedung B UPB Kebumen', 'Pelatihan mendalam membangun web aplikasi modern responsif & scalable menggunakan App Router.', 40, 34, 'Open', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'),
('evt-2', 'ComitUPB Hackathon 2026: AI & Tech Innovation', 'Kompetisi', '2026-09-01', 'Auditorium Utama Universitas Putra Bangsa', 'Ajang kompetisi 24 jam untuk mengembangkan solusi digital berbasis AI bagi masyarakat.', 100, 88, 'Open', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'),
('evt-3', 'Cyber Security Essentials & CTF Beginner', 'Webinar', '2026-07-10', 'Google Meet / Online', 'Pengenalan konsep dasar keamanan siber dan simulasi Capture The Flag bagi mahasiswa.', 150, 150, 'Finished', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80');

-- Seed: showcases
INSERT INTO showcases (id, title, author, division, description, tech_stack, demo_url, repo_url, image_url, featured) VALUES
('sc-1', 'ComitUPB Official Landing Page', 'Tim Web Dev ComitUPB', 'Divisi Web Development', 'Website resmi organisasi ComitUPB dengan GSAP animasi modern dan tampilan futuristic.', ARRAY['Next.js', 'Tailwind CSS', 'GSAP', 'TypeScript'], 'https://comitupb.org', 'https://github.com/commit-upb/landing-page', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', true),
('sc-2', 'UPB Academic Companion App', 'Tim Mobile App', 'Divisi Mobile App', 'Aplikasi pembantu jadwal kuliah, pengingat tugas, dan info kampus bagi mahasiswa UPB.', ARRAY['Flutter', 'Supabase', 'Dart'], 'https://play.google.com/store', 'https://github.com/commit-upb/upb-companion', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', true);

-- Seed: contact_messages
INSERT INTO contact_messages (id, name, email, subject, message, is_read, created_at) VALUES
('msg-1', 'Rian Hidayat', 'rian@gmail.com', 'Pertanyaan Pendaftaran Anggota Baru', 'Halo admin ComitUPB, apakah pendaftaran anggota terbuka untuk mahasiswa semester 1 prodi Teknik Informatika?', false, '2026-07-21T14:30:00Z'),
('msg-2', 'PT Media Solusi Tech', 'hrd@mediasolusi.co.id', 'Penawaran Kolaborasi Event & Sponsorship', 'Kami ingin menawarkan kerjasama sponsorship untuk event Hackathon 2026 ComitUPB.', true, '2026-07-20T09:15:00Z');

-- Seed: vault_modules
INSERT INTO vault_modules (id, category, category_name, title, speaker, duration, video_url, image_url, level, is_published, created_at) VALUES
('mod-1', 'web', 'Web Development', 'Mastering Next.js 14 & Tailwind CSS Masterclass', 'Fajar Pratama (Alumni Senior Web Dev)', '45:32', 'https://youtube.com/watch?v=mock1', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80', 'Intermediate', true, '2026-06-15T10:00:00Z'),
('mod-2', 'cyber', 'Cyber Security', 'Fundamental Network Penetration Testing & CTF', 'Rizal Hidayat (Lead Cyber Security)', '58:10', 'https://youtube.com/watch?v=mock2', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80', 'Beginner - Advanced', true, '2026-06-20T14:30:00Z'),
('mod-3', 'ai', 'AI & Data Science', 'Building LLM Apps with Python & OpenAI API', 'Dian Sastro (Data & AI Enthusiast)', '38:17', 'https://youtube.com/watch?v=mock3', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80', 'Advanced', true, '2026-07-01T09:15:00Z'),
('mod-4', 'design', 'UI/UX Design', 'Design System & Prototyping di Figma dari Nol', 'Anisa Rahma (UI/UX Designer)', '42:05', 'https://youtube.com/watch?v=mock4', 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80', 'Beginner', true, '2026-07-05T11:20:00Z');
