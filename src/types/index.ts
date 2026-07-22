export interface Member {
  id: string;
  name: string;
  email: string;
  major: string;
  status: 'Active' | 'Alumni' | 'Pending';
  createdAt?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
  imageUrl: string;
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  thumbnailUrl: string;
  demoUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  imageUrl: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  memberName: string;
  role?: string;
  testimonialText: string;
  memberPhotoUrl: string;
  batch?: string;
}

export interface Division {
  id: string;
  name: string;
  iconName: string;
  description: string;
  memberCount: number;
  techStack: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  major: string;
  divisionInterest?: string;
  reason?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
