import { EventItem, DivisionItem, MemberItem, ShowcaseItem, ContactMessage, VaultModuleItem } from '@/types/admin';

export const mockVaultModules: VaultModuleItem[] = [
  {
    id: 'mod-1',
    category: 'web',
    category_name: 'Web Development',
    title: 'Mastering Next.js 14 & Tailwind CSS Masterclass',
    speaker: 'Fajar Pratama (Alumni Senior Web Dev)',
    duration: '45:32',
    video_url: 'https://youtube.com/watch?v=mock1',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    level: 'Intermediate',
    is_published: true,
    created_at: '2026-06-15T10:00:00Z'
  },
  {
    id: 'mod-2',
    category: 'cyber',
    category_name: 'Cyber Security',
    title: 'Fundamental Network Penetration Testing & CTF',
    speaker: 'Rizal Hidayat (Lead Cyber Security)',
    duration: '58:10',
    video_url: 'https://youtube.com/watch?v=mock2',
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    level: 'Beginner - Advanced',
    is_published: true,
    created_at: '2026-06-20T14:30:00Z'
  },
  {
    id: 'mod-3',
    category: 'ai',
    category_name: 'AI & Data Science',
    title: 'Building LLM Apps with Python & OpenAI API',
    speaker: 'Dian Sastro (Data & AI Enthusiast)',
    duration: '38:17',
    video_url: 'https://youtube.com/watch?v=mock3',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    level: 'Advanced',
    is_published: true,
    created_at: '2026-07-01T09:15:00Z'
  },
  {
    id: 'mod-4',
    category: 'design',
    category_name: 'UI/UX Design',
    title: 'Design System & Prototyping di Figma dari Nol',
    speaker: 'Anisa Rahma (UI/UX Designer)',
    duration: '42:05',
    video_url: 'https://youtube.com/watch?v=mock4',
    image_url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80',
    level: 'Beginner',
    is_published: true,
    created_at: '2026-07-05T11:20:00Z'
  }
];

export const mockEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Workshop Modern Web Development dengan Next.js 14',
    category: 'Workshop & Bootcamp',
    date: '2026-08-15',
    location: 'Lab Komputer 3, Gedung B UPB Kebumen',
    description: 'Pelatihan mendalam membangun web aplikasi modern responsif & scalable menggunakan App Router.',
    quota: 40,
    registered_count: 34,
    status: 'Open',
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-2',
    title: 'ComitUPB Hackathon 2026: AI & Tech Innovation',
    category: 'Kompetisi',
    date: '2026-09-01',
    location: 'Auditorium Utama Universitas Putra Bangsa',
    description: 'Ajang kompetisi 24 jam untuk mengembangkan solusi digital berbasis AI bagi masyarakat.',
    quota: 100,
    registered_count: 88,
    status: 'Open',
    image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-3',
    title: 'Cyber Security Essentials & CTF Beginner',
    category: 'Webinar',
    date: '2026-07-10',
    location: 'Google Meet / Online',
    description: 'Pengenalan konsep dasar keamanan siber dan simulasi Capture The Flag bagi mahasiswa.',
    quota: 150,
    registered_count: 150,
    status: 'Finished',
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  }
];

export const mockDivisions: DivisionItem[] = [
  {
    id: 'div-web',
    name: 'Divisi Web Development',
    slug: 'web-dev',
    description: 'Fokus membangun website & web apps modern berkecerdasan tinggi dan terintegrasi API.',
    icon: 'Globe',
    member_count: 85,
    head_name: 'Ahmad Rizky'
  },
  {
    id: 'div-cyber',
    name: 'Divisi Cyber Security',
    slug: 'cyber-sec',
    description: 'Fokus pada keamanan jaringan, analisis sistem, penetration testing, dan tim CTF.',
    icon: 'Shield',
    member_count: 45,
    head_name: 'Budi Santoso'
  },
  {
    id: 'div-mobile',
    name: 'Divisi Mobile App',
    slug: 'mobile-dev',
    description: 'Fokus pada pengembangan aplikasi Android & iOS responsif berkinerja cepat.',
    icon: 'Smartphone',
    member_count: 50,
    head_name: 'Siti Nurhaliza'
  },
  {
    id: 'div-ai',
    name: 'Divisi Data & AI',
    slug: 'ai-data',
    description: 'Fokus pada pengolahan data, machine learning, visualisasi insight, dan otomatisasi.',
    icon: 'Cpu',
    member_count: 40,
    head_name: 'Fikri Ardiansyah'
  },
  {
    id: 'div-uiux',
    name: 'Divisi Creative UI/UX',
    slug: 'ui-ux',
    description: 'Fokus pada desain antarmuka, riset pengalaman pengguna, dan aset grafis digital.',
    icon: 'Palette',
    member_count: 38,
    head_name: 'Nadia Putri'
  }
];

export const mockMembers: MemberItem[] = [
  {
    id: 'mem-1',
    name: 'Ahmad Rizky',
    npm: '312210450',
    division_id: 'div-web',
    division_name: 'Divisi Web Development',
    role: 'Ketua Divisi',
    email: 'rizky@comitupb.org',
    status: 'Active'
  },
  {
    id: 'mem-2',
    name: 'Siti Nurhaliza',
    npm: '312210451',
    division_id: 'div-mobile',
    division_name: 'Divisi Mobile App',
    role: 'Ketua Divisi',
    email: 'siti@comitupb.org',
    status: 'Active'
  },
  {
    id: 'mem-3',
    name: 'Dimas Pratama',
    npm: '312210499',
    division_id: 'div-web',
    division_name: 'Divisi Web Development',
    role: 'Anggota',
    email: 'dimas@gmail.com',
    status: 'Active'
  }
];

export const mockShowcases: ShowcaseItem[] = [
  {
    id: 'sc-1',
    title: 'ComitUPB Official Landing Page',
    author: 'Tim Web Dev ComitUPB',
    division: 'Divisi Web Development',
    description: 'Website resmi organisasi ComitUPB dengan GSAP animasi modern dan tampilan futuristic.',
    tech_stack: ['Next.js', 'Tailwind CSS', 'GSAP', 'TypeScript'],
    demo_url: 'https://comitupb.org',
    repo_url: 'https://github.com/commit-upb/landing-page',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'sc-2',
    title: 'UPB Academic Companion App',
    author: 'Tim Mobile App',
    division: 'Divisi Mobile App',
    description: 'Aplikasi pembantu jadwal kuliah, pengingat tugas, dan info kampus bagi mahasiswa UPB.',
    tech_stack: ['Flutter', 'Supabase', 'Dart'],
    demo_url: 'https://play.google.com/store',
    repo_url: 'https://github.com/commit-upb/upb-companion',
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    featured: true
  }
];

export const mockMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Rian Hidayat',
    email: 'rian@gmail.com',
    subject: 'Pertanyaan Pendaftaran Anggota Baru',
    message: 'Halo admin ComitUPB, apakah pendaftaran anggota terbuka untuk mahasiswa semester 1 prodi Teknik Informatika?',
    created_at: '2026-07-21T14:30:00Z',
    is_read: false
  },
  {
    id: 'msg-2',
    name: 'PT Media Solusi Tech',
    email: 'hrd@mediasolusi.co.id',
    subject: 'Penawaran Kolaborasi Event & Sponsorship',
    message: 'Kami ingin menawarkan kerjasama sponsorship untuk event Hackathon 2026 ComitUPB.',
    created_at: '2026-07-20T09:15:00Z',
    is_read: true
  }
];
