import { NextResponse } from "next/server";
import { ContactInput } from "@/types";

const mockMessages: Array<ContactInput & { id: string; createdAt: string }> = [];

export async function POST(request: Request) {
  try {
    const body: ContactInput = await request.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama wajib diisi." },
        { status: 400 }
      );
    }

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Alamat email tidak valid." },
        { status: 400 }
      );
    }

    if (!body.subject || !body.subject.trim()) {
      return NextResponse.json(
        { success: false, message: "Subjek pesan wajib diisi." },
        { status: 400 }
      );
    }

    if (!body.message || !body.message.trim()) {
      return NextResponse.json(
        { success: false, message: "Isi pesan tidak boleh kosong." },
        { status: 400 }
      );
    }

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: body.subject.trim(),
      message: body.message.trim(),
      createdAt: new Date().toISOString(),
    };

    mockMessages.push(newMessage);

    return NextResponse.json(
      {
        success: true,
        message: "Pesan Anda berhasil terkirim! Tim ComitUPB akan segera merespons.",
        data: newMessage,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}
