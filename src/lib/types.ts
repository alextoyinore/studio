import type { ImagePlaceholder } from './placeholder-images';

export type TravelType = 'work' | 'student' | 'vacation';

export type Destination = {
  id: string;
  name: string;
  description: string;
  image: ImagePlaceholder;
  attractions: string[];
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  travelType: TravelType[];
  applyUrl: string;
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
  name: string;
  location: string;
  country: string;
  description: string;
  image: ImagePlaceholder;
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
