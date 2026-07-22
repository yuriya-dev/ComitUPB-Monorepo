import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabase';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'ComitUPB Backend API Server', timestamp: new Date().toISOString() });
});

/* ==========================================================================
   PUBLIC LANDING PAGE ENDPOINTS
   ========================================================================== */

// 1. Register Member (Landing Page Form)
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { name, email, phone_number, major, divisionInterest, reason } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Nama lengkap wajib diisi.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Alamat email tidak valid.' });
    }

    const divisionIdMap: Record<string, string> = {
      'Web Development': 'div-web',
      'Cyber Security': 'div-cyber',
      'Mobile App Development': 'div-mobile',
      'Data Science & AI': 'div-ai',
      'UI/UX Design': 'div-uiux'
    };

    const divisionName = divisionInterest ? `Divisi ${divisionInterest}` : 'Divisi Web Development';

    const newMember = {
      id: `mem-${Date.now()}`,
      name: name.trim(),
      npm: major ? major.trim() : `3122${Math.floor(1000 + Math.random() * 9000)}`,
      division_id: divisionIdMap[divisionInterest || 'Web Development'] || 'div-web',
      division_name: divisionName,
      role: 'Calon Anggota',
      email: email.trim().toLowerCase(),
      phone_number: phone_number ? phone_number.trim() : '',
      status: 'Pending'
    };

    const { data, error } = await supabase.from('members').insert([newMember]).select().single();

    if (error) {
      return res.status(500).json({ success: false, message: `Gagal menyimpan ke database: ${error.message}` });
    }

    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil! Data kamu sudah tersimpan dan menunggu verifikasi pengurus ComitUPB.',
      data: data || newMember
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: err.message });
  }
});

// 2. Contact Message (Landing Page Contact Form)
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Semua field pesan wajib diisi.' });
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      is_read: false,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('contact_messages').insert([newMessage]).select().single();

    if (error) {
      return res.status(500).json({ success: false, message: `Gagal mengirim pesan: ${error.message}` });
    }

    res.json({ success: true, message: 'Pesan Anda berhasil terkirim! Tim ComitUPB akan segera merespons.', data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: err.message });
  }
});

/* ==========================================================================
   PUBLIC DATA FETCHING ENDPOINTS (FOR LANDING PAGE)
   ========================================================================== */

app.get('/api/public/divisions', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('divisions').select('*');
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.get('/api/public/vault-modules', async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('vault_modules')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.get('/api/public/events', async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.get('/api/public/showcases', async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('showcases')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

/* ==========================================================================
   ADMIN DASHBOARD CRUD ENDPOINTS
   ========================================================================== */

// MEMBERS CRUD
app.get('/api/admin/members', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('members').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.post('/api/admin/members', async (req: Request, res: Response) => {
  const payload = { id: `mem-${Date.now()}`, ...req.body };
  const { data, error } = await supabase.from('members').insert([payload]).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.status(201).json({ success: true, data });
});

app.put('/api/admin/members/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('members').update(req.body).eq('id', id).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.delete('/api/admin/members/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('members').delete().eq('id', id);
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, message: 'Member deleted' });
});

// EVENTS CRUD
app.get('/api/admin/events', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.post('/api/admin/events', async (req: Request, res: Response) => {
  const payload = { id: `evt-${Date.now()}`, ...req.body };
  const { data, error } = await supabase.from('events').insert([payload]).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.status(201).json({ success: true, data });
});

app.put('/api/admin/events/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('events').update(req.body).eq('id', id).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.delete('/api/admin/events/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, message: 'Event deleted' });
});

// DIVISIONS CRUD
app.get('/api/admin/divisions', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('divisions').select('*');
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.post('/api/admin/divisions', async (req: Request, res: Response) => {
  const payload = { id: `div-${Date.now()}`, ...req.body };
  const { data, error } = await supabase.from('divisions').insert([payload]).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.status(201).json({ success: true, data });
});

app.put('/api/admin/divisions/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('divisions').update(req.body).eq('id', id).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.delete('/api/admin/divisions/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('divisions').delete().eq('id', id);
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, message: 'Division deleted' });
});

// SHOWCASES CRUD
app.get('/api/admin/showcases', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('showcases').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.post('/api/admin/showcases', async (req: Request, res: Response) => {
  const payload = { id: `sc-${Date.now()}`, ...req.body };
  const { data, error } = await supabase.from('showcases').insert([payload]).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.status(201).json({ success: true, data });
});

app.put('/api/admin/showcases/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('showcases').update(req.body).eq('id', id).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.delete('/api/admin/showcases/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('showcases').delete().eq('id', id);
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, message: 'Showcase deleted' });
});

// MESSAGES READ / DELETE
app.get('/api/admin/messages', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.put('/api/admin/messages/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('contact_messages').update(req.body).eq('id', id).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.delete('/api/admin/messages/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, message: 'Message deleted' });
});

// VAULT MODULES CRUD
app.get('/api/admin/vault', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('vault_modules').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.post('/api/admin/vault', async (req: Request, res: Response) => {
  const payload = { id: `mod-${Date.now()}`, ...req.body };
  const { data, error } = await supabase.from('vault_modules').insert([payload]).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.status(201).json({ success: true, data });
});

app.put('/api/admin/vault/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('vault_modules').update(req.body).eq('id', id).select().single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

app.delete('/api/admin/vault/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('vault_modules').delete().eq('id', id);
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, message: 'Vault module deleted' });
});

app.listen(PORT, () => {
  console.log(`🚀 ComitUPB Backend Express Server running on http://localhost:${PORT}`);
});
