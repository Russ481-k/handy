import { Project } from "@/types/project";
import { BlogPost } from "@/types/blog";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog-posts";
import { ProjectDetailResponse } from "@/types/project/response";

import {
  ProjectFilterParams,
  ProjectListResponse,
} from "@/types/project/response";
import {
  BlogFilterParams,
  BlogListResponse,
  BlogDetailResponse,
} from "@/types/blog/response";

// 프로젝트 관련 함수
export async function getProjects(
  params?: ProjectFilterParams
): Promise<ProjectListResponse> {
  // 실제 API 호출로 대체 가능
  return {
    success: true,
    data: projects,
    pagination: {
      currentPage: params?.page || 1,
      totalPages: 1,
      totalItems: projects.length,
      itemsPerPage: params?.limit || 10,
    },
  };
}

export async function getProjectById(
  id: string
): Promise<ProjectDetailResponse> {
  const project = projects.find((p) => p.id === id);
  return {
    success: true,
    data: project || null,
    error: !project ? "프로젝트를 찾을 수 없습니다." : undefined,
  };
}

export async function getFeaturedProjects(
  count: number = 3
): Promise<Project[]> {
  return projects.slice(0, count);
}

// 블로그 관련 함수
export async function getBlogPosts(
  params?: BlogFilterParams
): Promise<BlogListResponse> {
  // 실제 API 호출로 대체 가능
  return {
    success: true,
    data: blogPosts,
    pagination: {
      currentPage: params?.page || 1,
      totalPages: 1,
      totalItems: blogPosts.length,
      itemsPerPage: params?.limit || 10,
    },
  };
}

export async function getBlogPostById(id: string): Promise<BlogDetailResponse> {
  const post = blogPosts.find((p) => p.id === id);
  return {
    success: true,
    data: post || null,
    error: !post ? "블로그 포스트를 찾을 수 없습니다." : undefined,
  };
}

export async function getRecentBlogPosts(
  count: number = 3
): Promise<BlogPost[]> {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
