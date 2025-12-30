// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Student types
export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  avatar?: string;
  grade?: string;
  course?: string;
  enrollmentDate: string;
}

// Assignment types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  maxGrade: number;
  submittedAt?: string;
}

// Result types
export interface Result {
  id: string;
  studentId: string;
  studentName: string;
  assignmentId: string;
  assignmentTitle: string;
  grade: number;
  maxGrade: number;
  submittedAt: string;
  gradedAt?: string;
  feedback?: string;
}

// Upload types
export interface UploadProgress {
  filename: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export interface UploadHistory {
  id: string;
  filename: string;
  uploadedAt: string;
  size: number;
  status: 'processing' | 'completed' | 'failed';
}

// UI types
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ar';

// API types
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// Filter types
export interface ResultFilters {
  search?: string;
  studentId?: string;
  assignmentId?: string;
  dateFrom?: string;
  dateTo?: string;
  minGrade?: number;
  maxGrade?: number;
}

export interface StudentFilters {
  search?: string;
  course?: string;
  grade?: string;
}
