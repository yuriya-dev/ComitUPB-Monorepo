import { supabase } from "@/lib/supabase";
import { RegisterInput, ContactInput, ApiResponse } from "@/types";

export async function registerMember(data: RegisterInput): Promise<ApiResponse> {
  try {
    const divisionIdMap: Record<string, string> = {
      'Web Development': 'div-web',
      'Cyber Security': 'div-cyber',
      'Mobile App Development': 'div-mobile',
      'Data Science & AI': 'div-ai',
      'UI/UX Design': 'div-uiux'
    };

    const divisionName = data.divisionInterest ? `Divisi ${data.divisionInterest}` : 'Divisi Web Development';

    const newMember = {
      id: `mem-${Date.now()}`,
      name: data.name.trim(),
      npm: data.major ? data.major.trim() : `3122${Math.floor(1000 + Math.random() * 9000)}`,
      division_id: divisionIdMap[data.divisionInterest || 'Web Development'] || 'div-web',
      division_name: divisionName,
      role: 'Calon Anggota',
      email: data.email.trim().toLowerCase(),
      status: 'Pending'
    };

    const { data: insertedData, error } = await supabase
      .from('members')
      .insert([newMember])
      .select()
      .single();

    if (error) {
      console.error('Supabase member insert error:', error);
      return {
        success: false,
        message: `Gagal menyimpan ke database: ${error.message}`,
        error: error.message
      };
    }

    return {
      success: true,
      message: "Pendaftaran berhasil! Data kamu sudah tersimpan di sistem dan menunggu verifikasi pengurus ComitUPB.",
      data: insertedData || newMember,
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

    const { data: insertedMsg, error } = await supabase
      .from('contact_messages')
      .insert([newMessage])
      .select()
      .single();

    if (error) {
      console.error('Supabase message insert error:', error);
      return {
        success: false,
        message: `Gagal mengirim pesan: ${error.message}`,
        error: error.message
      };
    }

    return {
      success: true,
      message: "Pesan Anda berhasil terkirim! Tim ComitUPB akan segera merespons.",
      data: insertedMsg || newMessage,
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
