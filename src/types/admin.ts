export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  quota: number;
  registered_count: number;
  status: 'Open' | 'Closed' | 'Draft' | 'Finished';
  image_url?: string;
  created_at?: string;
}

export interface DivisionItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  member_count: number;
  head_name: string;
}

export interface MemberItem {
  id: string;
  name: string;
  npm: string;
  division_id: string;
  division_name: string;
  role: string;
  email: string;
  avatar_url?: string;
  status: 'Active' | 'Alumni' | 'Inactive' | 'Pending';
}

export interface ShowcaseItem {
  id: string;
  title: string;
  author: string;
  division: string;
  description: string;
  tech_stack: string[];
  demo_url?: string;
  repo_url?: string;
  image_url?: string;
  featured: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface VaultModuleItem {
  id: string;
  category: 'web' | 'cyber' | 'ai' | 'design';
  category_name: string;
  title: string;
  speaker: string;
  duration: string;
  video_url: string;
  image_url: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner - Advanced';
  is_published: boolean;
  created_at: string;
}
