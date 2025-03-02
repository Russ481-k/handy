import { BlogPost } from "../blog";

export interface BlogFilterParams {
  page?: number;
  limit?: number;
  category?: string;
}

export interface BlogListResponse {
  success: boolean;
  data: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface BlogDetailResponse {
  success: boolean;
  data: BlogPost | null;
  error?: string;
}
