# ComitUPB — Admin Dashboard Portal

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

Portal Admin Dashboard resmi untuk **ComitUPB (Komunitas IT Universitas Putra Bangsa Kebumen)**. Aplikasi admin ini dirancang khusus untuk mengelola konten landing page, bagan grafik struktur organisasi interaktif, event & kegiatan, vault modul/workshop eksklusif, keanggotaan, karya mahasiswa/showcase, pesan masuk, serta konfigurasi operasional situs secara terpadu.

---

## 🚀 Fitur Utama Dashboard Admin

- **Ringkasan Overview (Dashboard)**: Statistik real-time total anggota, event mendatang, pesan belum dibaca, dan grafik aktivitas bulanan.
- **Jejak Langkah & Event Seru**: Manajemen lengkap event, bootcamp, workshop, kompetisi internal, lokasi, status kuota, serta dokumentasi banner (dilengkapi modal `Edit` & 3 card perbaris).
- **Divisi & Canvas Struktur Organisasi**:
  - Tampilan daftar 5 divisi utama ComitUPB (*Web Dev, Cyber Security, Mobile App, Data & AI, Creative UI/UX*).
  - **Canvas Interactive Org Chart**: Visualisasi hierarki bagan pengurus (Pembina, Ketua Umum, Wakil, Ketua Divisi) dengan fitur tambah node, unggah foto avatar pengurus, serta penataan garis hubungan interaktif.
- **Vault Modul & Workshop Eksklusif**: Manajemen video rekaman webinar, materi pembelajaran eksklusif, link YouTube/Drive, tingkat kesulitan, serta kontrol publikasi (*Publik / Draft*).
- **Manajemen Anggota**: Pengelolaan data anggota/pengurus aktif, alumni, NPM, email, dan peranan dalam organisasi.
- **Showcase Proyek Mahasiswa**: Pengelolaan portofolio karya digital mahasiswa, tech stack, link repositori GitHub, serta status karya pilihan (*Featured*).
- **Inbox Pesan & Kontak**: Kotak masuk pesan pertanyaan dari pengunjung landing page.
- **Pengaturan Lainnya**: Pengaturan nama publik organisasi, email resmi, banner pengumuman top-bar, serta toggle mode operasional (pendaftaran & pemeliharaan).

---

## 🎨 Sistem Desain & Visual

Aplikasi admin dashboard ini menggunakan **Design Tokens & Theme** yang selaras dengan Landing Page ComitUPB:
- **Warna Utama (Primary)**: Deep Ocean Blue (`#0668C6`) & Primary Hover (`#044484`).
- **Tema Latar Belakang (Light Theme)**: Off-white Slate clean (`#F8FAFC`).
- **Elemen UI Sculpted & Tactile**:
  - Tombol Taktil (`btn-primary-tactile`) dengan efek kedalaman bayangan 3D `shadow-[0_3px_0_0_#044484]`.
  - Kartu Khas Sculpted (`card-sculpted`) dengan kelengkungan sudut polaroid asimetris `rounded-[26px_8px_26px_26px]`.
- **Komponen Reusable Modal**: Modal dialog dialogik serbaguna yang dapat ditutup melalui klik backdrop luar (*click-outside*) maupun tombol `Esc`.

---

## 🛠️ Teknologi & Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library UI**: [React 18](https://react.org/)
- **Canvas Diagram Interaktif**: [React Flow / @xyflow/react](https://reactflow.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Icon Set**: [Lucide React Icons](https://lucide.dev/)
- **Database & Integration**: [Supabase](https://supabase.com/) (`ycdvufawexwjrqfigkxc`)

---

## 💻 Panduan Pengembangan (Local Development)

### 1. Prasyarat
Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 18.x atau 20.x disarankan)
- Package Manager (`npm`, `yarn`, atau `pnpm`)

### 2. Kloning Repositori & Navigasi
```bash
git clone https://github.com/commit-upb/comitupb-admin.git
cd ComitUPB-admin
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Menjalankan Server Dev
Jalankan dev server lokal:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda untuk mengakses Admin Dashboard.

---

## 📦 Perintah NPM (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server lokal Next.js mode pengembangan |
| `npm run build` | Membuat build produksi teroptimasi di folder `.next` |
| `npm run start` | Menjalankan server Next.js mode produksi |
| `npm run lint` | Menjalankan analisis sintaks kode dengan ESLint |

---

## 📁 Struktur Direktori

```text
ComitUPB-admin/
├── public/              # Aset statis (logo, favicon)
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── dashboard/   # Halaman Admin Dashboard
│   │   │   ├── divisions/ # Divisi & Canvas Org Chart
│   │   │   ├── events/    # Jejak Langkah & Event Seru
│   │   │   ├── members/   # Kelola Anggota
│   │   │   ├── messages/  # Inbox Pesan
│   │   │   ├── settings/  # Pengaturan Lainnya
│   │   │   ├── showcases/ # Portfolio Proyek
│   │   │   └── vault/     # Vault Modul & Workshop
│   │   ├── globals.css  # Utility CSS Tokens (card-sculpted, btn-tactile)
│   │   └── layout.tsx   # Root Layout
│   ├── components/      # Komponen UI Reusable (Modal, Sidebar, Navbar, OrgChartCanvas)
│   ├── lib/             # Mock data & Supabase helper client
│   └── types/           # Definisi TypeScript Interfaces (admin.ts)
├── next.config.mjs      # Konfigurasi Next.js
├── tailwind.config.ts   # Konfigurasi Tailwind CSS Tokens & Shadows
└── tsconfig.json        # Konfigurasi TypeScript
```

---

## 🤝 Kontribusi

Sama seperti Landing Page utama, kami menyambut baik ide & perbaikan dari pengembang tim internal ComitUPB!
1. **Fork** repositori ini
2. Buat branch fitur baru (`git checkout -b fitur/FiturAdmin`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan FiturAdmin'`)
4. Push ke branch tersebut (`git push origin fitur/FiturAdmin`)
5. Buat **Pull Request**

---

## 📬 Kontak & Komunitas

- **Landing Page**: [comitupb.org](http://localhost:3000)
- **Email Admin**: admin@comitupb.org
- **Instagram**: [@commit_upb](https://instagram.com/commit_upb)
- **GitHub**: [commit-upb](https://github.com/commit-upb)
- **Alamat**: Kampus Utama Universitas Putra Bangsa, Jl. Ronggowarsito No. 18, Pejagoan, Kebumen
