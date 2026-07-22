# ComitUPB — Landing Page & Portal Web

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

Official website untuk **ComitUPB (Komunitas IT Universitas Putra Bangsa Kebumen)**. Web ini dirancang sebagai platform informasi, etalase karya/showcase proyek mahasiswa, pusat informasi divisi & kegiatan, serta sarana kolaborasi teknologi bagi seluruh anggota dan sivitas akademika.

---

## 🚀 Fitur Utama

- **Beranda (Landing Page)**: Informasi umum, hero section interaktif, serta statistik komunitas.
- **Tentang Kami**: Profil organisasi, visi & misi, serta daftar struktur pengurus.
- **Divisi & Belajar**: Informasi divisi keahlian (Web Dev, Cyber Security, Data Science, Mobile Dev, UI/UX Design).
- **Kegiatan / Events**: Daftar agenda workshop, bootcamp, seminar, dan meetup komunitas.
- **Showcase Proyek**: Etalase hasil karya, aplikasi, dan riset anggota ComitUPB.
- **Kontak & FAQ**: Form kontak, lokasi Kampus UPB Kebumen, dan jawaban pertanyaan umum.

---

## 🛠️ Teknologi & Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library UI**: [React 18](https://react.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Animasi & Icon**: [GSAP](https://greensock.com/gsap/) (`@gsap/react`), [Lucide React Icons](https://lucide.dev/)
- **Utility**: `clsx`, `tailwind-merge`

---

## 💻 Panduan Pengembangan (Local Development)

### 1. Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (versi 18.x atau yang lebih baru disarankan)
- Package Manager (`npm`, `yarn`, atau `pnpm`)

### 2. Kloning Repositori
```bash
git clone https://github.com/commit-upb/comitupb-web.git
cd comitupb-web
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Menjalankan Server Dev
Jalankan server pengembangan lokal:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda untuk melihat hasilnya.

---

## 📦 Perintah NPM (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server lokal dalam mode pengembangan |
| `npm run build` | Membuat build produksi teroptimasi di folder `.next` / `out` |
| `npm run start` | Menjalankan server Next.js mode produksi |
| `npm run lint` | Menjalankan verifikasi sintaks dan kode dengan ESLint |

---

## 📁 Struktur Direktori

```text
ComitUPB/
├── public/              # Aset statis (gambar, icon, logo)
├── src/
│   ├── app/             # Next.js App Router (Pages, Layouts, APIs)
│   ├── components/      # Komponen UI Reusable
│   ├── config/          # Konfigurasi situs (site.ts)
│   ├── lib/             # Utility functions & helpers
│   └── types/           # Definisi TypeScript Interfaces/Types
├── .env.local           # Environment variables lokal
├── next.config.mjs      # Konfigurasi Next.js
├── tailwind.config.ts   # Konfigurasi Tailwind CSS
└── tsconfig.json        # Konfigurasi TypeScript
```

---

## 🤝 Kontribusi

Kami menyambut baik kontribusi dari anggota ComitUPB maupun pengembang luar! 
1. **Fork** repositori ini
2. Buat branch fitur baru (`git checkout -b fitur/FiturBaru`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan FiturBaru'`)
4. Push ke branch tersebut (`git push origin fitur/FiturBaru`)
5. Buat **Pull Request**

---

## 📬 Kontak & Komunitas

- **Email**: info@comitupb.org
- **Instagram**: [@commit_upb](https://instagram.com/commit_upb)
- **GitHub**: [commit-upb](https://github.com/commit-upb)
- **Discord**: [Join Server Discord](https://discord.gg/h4JXudfrAY)
- **Alamat**: Kampus Utama Universitas Putra Bangsa, Jl. Ronggowarsito No. 18, Pejagoan, Kebumen
