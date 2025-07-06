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
  icon: "rocket" | "heart" | "trending-up" | "people" | "shield";
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

export interface ValueItem {
  icon: ReactElement;
  title: string;
  description: string;
}

import { BlogPost } from "@/types";
import { ReactElement } from "react";
