import { PaginationMetadata } from "./pagination";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: PaginationMetadata;
}
