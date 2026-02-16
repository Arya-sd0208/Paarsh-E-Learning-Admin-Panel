export type Course = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  rating: number;
  reviews: number;
  price: number;
  category: string;
  duration: string;
  slug: string;
};

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  quote: string;
  imageUrl: string;
  imageHint: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  author: string;
  date: string;
};

export type Event = {
  id: string;
  title: string;
  type: 'Webinar' | 'Workshop';
  date: string;
};

export type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageHint: string;
  alt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Teacher' | 'Admin';
  status: 'Active' | 'Inactive';
  joined: string;
};

export type Role = 'student' | 'teacher' | 'admin';