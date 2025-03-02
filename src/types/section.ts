export interface Teams {
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface BaseProps {
  lng: string;
}

export interface SectionProps {
  title: string;
}

export interface Feature {
  icon: "rocket" | "heart" | "trending-up";
  title: string;
  description: string;
}

export interface ClientSectionProps extends SectionProps {
  features?: Feature[];
  projects?: Project[];
  posts?: BlogPost[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

import { BlogPost } from "@/types";
