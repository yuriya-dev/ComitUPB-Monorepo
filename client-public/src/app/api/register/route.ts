import { NextResponse } from "next/server";
import { RegisterInput } from "@/types";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body: RegisterInput = await request.json();

    // Input validation
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap wajib diisi." },
        { status: 400 }
      );
    }

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Alamat email tidak valid." },
        { status: 400 }
      );
    }

    if (!body.major || !body.major.trim()) {
      return NextResponse.json(
        { success: false, message: "Program studi/jurusan/NPM wajib diisi." },
        { status: 400 }
      );
    }

    const divisionIdMap: Record<string, string> = {
      'Web Development': 'div-web',
      'Cyber Security': 'div-cyber',
      'Mobile App': 'div-mobile',
      'Data & AI': 'div-ai',
      'Creative UI/UX': 'div-uiux'
    };

    const divisionName = body.divisionInterest ? `Divisi ${body.divisionInterest}` : 'Divisi Web Development';

    const newMember = {
      id: `mem-${Date.now()}`,
      name: body.name.trim(),
      npm: body.major.trim(),
      division_id: divisionIdMap[body.divisionInterest || 'Web Development'] || 'div-web',
      division_name: divisionName,
      role: 'Calon Anggota',
      email: body.email.trim().toLowerCase(),
      status: 'Pending'
    };

    // Insert directly into Supabase members table
    const { data, error } = await supabase.from('members').insert([newMember]).select().single();

    if (error) {
      console.error('Supabase error registering member:', error);
      return NextResponse.json(
        { success: false, message: `Gagal menyimpan ke database: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pendaftaran berhasil! Tim ComitUPB akan menghubungi kamu melalui email untuk instruksi selanjutnya.",
        data: data || newMember,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}
