import type { ImagePlaceholder } from './placeholder-images';

export type TravelType = 'work' | 'student' | 'vacation';

export type Destination = {
  id: string;
  name: string;
  description: string;
  image: ImagePlaceholder;
  attractions: string[];
};

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
};

export type Course = {
  id: string;
  title: string;
  institution: string;
  location: string;
  duration: string;
  description: string;
  travelType: TravelType[];
  enrollUrl: string;
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

export type BlogPost = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  image_url: string;
  excerpt: string;
  category: string;
  tags: string[];
};