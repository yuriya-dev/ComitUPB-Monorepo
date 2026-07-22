export interface Member {
  id?: string;
  name: string;
  npm?: string;
  division_id?: string;
  division_name?: string;
  role?: string;
  email: string;
  phone_number?: string;
  status?: string;
  created_at?: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  phone_number?: string;
  major?: string;
  divisionInterest?: string;
  reason?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface Event {
  id?: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  category?: string;
  image_url?: string;
}

export interface Division {
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
}

export interface Showcase {
  id?: string;
  title: string;
  author?: string;
  description?: string;
  image_url?: string;
  demo_url?: string;
  created_at?: string;
}

export interface VaultModule {
  id?: string;
  title: string;
  description?: string;
  category?: string;
  download_url?: string;
  is_published?: boolean;
  created_at?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
