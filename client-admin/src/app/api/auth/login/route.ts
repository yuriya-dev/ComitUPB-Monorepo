import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SignJWT } from 'jose';

// Konfigurasi akun admin resmi ComitUPB
const VALID_ADMIN_EMAIL = 'wahyutrichya@gmail.com';
const VALID_ADMIN_PASSWORD = 'comitgacor';

// JWT Secret Key
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'comitupb_secret_jwt_key_2026_super_secure'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email dan password wajib diisi.' },
        { status: 400 }
      );
    }

    // Validasi akun admin
    if (email.trim().toLowerCase() !== VALID_ADMIN_EMAIL.toLowerCase() || password !== VALID_ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Email atau kata sandi admin tidak valid.' },
        { status: 401 }
      );
    }

    // Generate JWT Token menggunakan SignJWT (kompatibel Edge runtime Next.js)
    const token = await new SignJWT({
      email: VALID_ADMIN_EMAIL,
      role: 'admin',
      name: 'Wahyu Trichya',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    const user = {
      email: VALID_ADMIN_EMAIL,
      name: 'Wahyu Trichya',
      role: 'Super Admin',
    };

    return NextResponse.json({
      success: true,
      message: 'Login berhasil.',
      token,
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server login.' },
      { status: 500 }
    );
  }
}
