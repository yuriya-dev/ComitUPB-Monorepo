import { supabase } from '../supabase';
import { RegisterDTO, ContactMessage, Member, Event, Division, Showcase, VaultModule } from '../types';

export class MemberService {
  static async register(dto: RegisterDTO) {
    const divisionIdMap: Record<string, string> = {
      'Web Development': 'div-web',
      'Cyber Security': 'div-cyber',
      'Mobile App Development': 'div-mobile',
      'Data Science & AI': 'div-ai',
      'UI/UX Design': 'div-uiux'
    };

    const divisionName = dto.divisionInterest ? `Divisi ${dto.divisionInterest}` : 'Divisi Web Development';

    const newMember = {
      id: `mem-${Date.now()}`,
      name: dto.name.trim(),
      npm: dto.major ? dto.major.trim() : `3122${Math.floor(1000 + Math.random() * 9000)}`,
      division_id: divisionIdMap[dto.divisionInterest || 'Web Development'] || 'div-web',
      division_name: divisionName,
      role: 'Calon Anggota',
      email: dto.email.trim().toLowerCase(),
      phone_number: dto.phone_number ? dto.phone_number.trim() : '',
      status: 'Pending'
    };

    const { data, error } = await supabase.from('members').insert([newMember]).select().single();
    if (error) throw new Error(error.message);
    return data || newMember;
  }

  static async getAll() {
    const { data, error } = await supabase.from('members').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  static async create(payload: Partial<Member>) {
    const memberData = { id: `mem-${Date.now()}`, ...payload };
    const { data, error } = await supabase.from('members').insert([memberData]).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: string, payload: Partial<Member>) {
    const { data, error } = await supabase.from('members').update(payload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase.from('members').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
}

export class ContactService {
  static async sendMessage(dto: ContactMessage) {
    const newMessage = {
      id: `msg-${Date.now()}`,
      name: dto.name.trim(),
      email: dto.email.trim().toLowerCase(),
      subject: dto.subject.trim(),
      message: dto.message.trim(),
      is_read: false,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('contact_messages').insert([newMessage]).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: string, payload: Partial<ContactMessage>) {
    const { data, error } = await supabase.from('contact_messages').update(payload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
}

export class DivisionService {
  static async getAll() {
    const { data, error } = await supabase.from('divisions').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  static async create(payload: Partial<Division>) {
    const divData = { id: `div-${Date.now()}`, ...payload };
    const { data, error } = await supabase.from('divisions').insert([divData]).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: string, payload: Partial<Division>) {
    const { data, error } = await supabase.from('divisions').update(payload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase.from('divisions').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
}

export class EventService {
  static async getAll() {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  static async create(payload: Partial<Event>) {
    const evtData = { id: `evt-${Date.now()}`, ...payload };
    const { data, error } = await supabase.from('events').insert([evtData]).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: string, payload: Partial<Event>) {
    const { data, error } = await supabase.from('events').update(payload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
}

export class ShowcaseService {
  static async getAll() {
    const { data, error } = await supabase.from('showcases').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  static async create(payload: Partial<Showcase>) {
    const scData = { id: `sc-${Date.now()}`, ...payload };
    const { data, error } = await supabase.from('showcases').insert([scData]).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: string, payload: Partial<Showcase>) {
    const { data, error } = await supabase.from('showcases').update(payload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase.from('showcases').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
}

export class VaultService {
  static async getPublished() {
    const { data, error } = await supabase
      .from('vault_modules')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from('vault_modules').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  static async create(payload: Partial<VaultModule>) {
    const modData = { id: `mod-${Date.now()}`, ...payload };
    const { data, error } = await supabase.from('vault_modules').insert([modData]).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: string, payload: Partial<VaultModule>) {
    const { data, error } = await supabase.from('vault_modules').update(payload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase.from('vault_modules').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
}
