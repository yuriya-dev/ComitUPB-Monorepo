# ComitUPB Monorepo

Struktur arsitektur terpisah antara Frontend dan Backend Express API Server:

- **`client-public`**: Next.js 14 Landing Page & Portal Publik ComitUPB
- **`client-admin`**: Next.js 14 Dashboard Admin Manajemen Anggota, Divisi, Event, Vault & Pesan
- **`server`**: Node.js Express TypeScript API Server & Supabase Database Service

## Cara Menjalankan Project

### 1. Menjalankan Backend Express API Server
```bash
cd server
npm install
npm run dev
# Server akan berjalan di http://localhost:5000
```

### 2. Menjalankan Client Public (Landing Page)
```bash
cd client-public
npm install
npm run dev
# Landing Page akan berjalan di http://localhost:3000
```

### 3. Menjalankan Client Admin (Dashboard)
```bash
cd client-admin
npm install
npm run dev
# Admin Dashboard akan berjalan di http://localhost:3001
```

### Menjalankan dari Root Monorepo:
- `npm run dev:server` - Jalankan Backend Express Server
- `npm run dev:public` - Jalankan Public Landing Page
- `npm run dev:admin` - Jalankan Dashboard Admin

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