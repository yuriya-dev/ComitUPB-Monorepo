import { NextResponse } from "next/server";
import { RegisterInput } from "@/types";

// Mock database in-memory store for member registrations
const mockMembers: Array<RegisterInput & { id: string; status: string; createdAt: string }> = [];

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
        { success: false, message: "Program studi/jurusan wajib diisi." },
        { status: 400 }
      );
    }

    // Check existing email
    const existing = mockMembers.find((m) => m.email.toLowerCase() === body.email.toLowerCase());
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email ini sudah terdaftar sebagai calon anggota ComitUPB." },
        { status: 409 }
      );
    }

    // Save record
    const newMember = {
      id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      major: body.major.trim(),
      divisionInterest: body.divisionInterest || "General",
      reason: body.reason || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    mockMembers.push(newMember);

    return NextResponse.json(
      {
        success: true,
        message: "Pendaftaran berhasil! Tim ComitUPB akan menghubungi kamu melalui email untuk instruksi selanjutnya.",
        data: newMember,
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
