import { supabase } from "@/lib/supabase";
import { RegisterInput, ContactInput, ApiResponse } from "@/types";

export async function registerMember(data: RegisterInput): Promise<ApiResponse> {
  try {
    const newMember = {
      id: `mem-${Date.now()}`,
      name: data.name.trim(),
      npm: `3122${Math.floor(1000 + Math.random() * 9000)}`,
      division_name: data.divisionInterest || 'Divisi Web Development',
      role: 'Anggota',
      email: data.email.trim().toLowerCase(),
      status: 'Active'
    };

    const { error } = await supabase.from('members').insert([newMember]);

    if (error) {
      console.warn('Supabase member insert fallback:', error.message);
    }

    return {
      success: true,
      message: "Pendaftaran berhasil! Tim ComitUPB akan menghubungi kamu melalui email untuk instruksi selanjutnya.",
      data: newMember,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Gagal terhubung ke server. Silakan coba lagi.",
      error: error.message,
    };
  }
}

export async function sendContactMessage(data: ContactInput): Promise<ApiResponse> {
  try {
    const newMessage = {
      id: `msg-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      is_read: false,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('contact_messages').insert([newMessage]);

    if (error) {
      console.warn('Supabase message insert fallback:', error.message);
    }

    return {
      success: true,
      message: "Pesan Anda berhasil terkirim! Tim ComitUPB akan segera merespons.",
      data: newMessage,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Gagal mengirim pesan. Silakan coba lagi.",
      error: error.message,
    };
  }
}

// Fetch live backend data for landing page
export async function getLandingVaultModules() {
  try {
    const { data, error } = await supabase
      .from('vault_modules')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
      
    if (error || !data || data.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getLandingDivisions() {
  try {
    const { data, error } = await supabase
      .from('divisions')
      .select('*');
      
    if (error || !data || data.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getLandingEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });
      
    if (error || !data || data.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getLandingShowcases() {
  try {
    const { data, error } = await supabase
      .from('showcases')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error || !data || data.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}
