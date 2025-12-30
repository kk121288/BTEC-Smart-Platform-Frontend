/**
 * API Response Types
 * 
 * Standardized types for all API responses to ensure type safety.
 */

// Generic API response wrapper
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Error response structure
export interface APIError {
  detail: string;
  status_code: number;
  timestamp?: string;
}

// Pagination metadata
export interface PaginationMeta {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Login response (matches FastAPI /token endpoint)
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'teacher' | 'student';
  };
}

// Register response
export interface RegisterResponse {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

// Plagiarism check response
export interface PlagiarismCheckResponse {
  id: string;
  assignment_id: string;
  similarity_score: number;
  sources: PlagiarismSource[];
  flagged: boolean;
  report_url?: string;
  checked_at: string;
}

export interface PlagiarismSource {
  url: string;
  similarity: number;
  matched_text: string;
}

// Assignment types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  created_at: string;
  updated_at: string;
}

// Student types
export interface Student {
  id: number;
  name: string;
  email: string;
  enrollment_number: string;
  created_at: string;
}
