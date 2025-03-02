import { Project } from "../project";

export interface ProjectFilterParams {
  page?: number;
  limit?: number;
  category?: string;
}

export interface ProjectListResponse {
  success: boolean;
  data: Project[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ProjectDetailResponse {
  success: boolean;
  data: Project | null;
  error?: string;
}
