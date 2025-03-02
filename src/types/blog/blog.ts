export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

export interface BlogPostMetadata {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}
