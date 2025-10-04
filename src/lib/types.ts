



import type { ImagePlaceholder } from './placeholder-images';

export type TravelType = 'work' | 'student' | 'vacation';

export type Location = {
  id: string;
  created_at: string;
  name: string;
  description: string;
  image_url: string;
  image_description: string;
  image_hint: string;
  attractions: string[];
};

export type Job = {
  id:string;
  created_at: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  travel_type: TravelType[];
  apply_url: string;
  image_url?: string;
  image_description?: string;
  image_hint?: string;
  // for local data
  travelType?: TravelType[];
  applyUrl?: string;
};

export type Course = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  duration: string;
  enroll_url: string;
  travel_type: TravelType[];
  school_id: string;
  // These are from local data, will be deprecated
  institution?: string;
  location?: string;
  enrollUrl?: string;
};

export type School = {
  id: string;
  created_at: string;
  name: string;
  location: string;
  country: string;
  description: string;
  image_url: string;
  image_description: string;
  image_hint: string;
  courses: Course[];
};

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type Profile = {
    id: string;
    email: string;
    role: 'superadmin' | 'admin' | 'staff' | 'user';
}

export type BlogPost = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  content: string;
  author: string; 
  author_email?: string;
  author_name?: string;
  image_url: string;
  image_description: string;
  image_hint: string;
  excerpt: string;
  category: string;
  tags: string[];
};
