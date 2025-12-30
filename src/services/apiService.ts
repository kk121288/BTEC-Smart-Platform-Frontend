import axiosInstance from '../api/axiosInstance';
import { API_CONFIG } from '../config/api.config';
import type {
  LoginResponse,
  RegisterResponse,
  PlagiarismCheckResponse,
  Assignment,
  Student,
  PaginatedResponse,
} from '../types/api';

/**
 * API Service
 * 
 * Centralized service layer for all backend API calls.
 * Uses typed responses and centralized endpoint configuration.
 */

// ==================== Authentication ====================

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    API_CONFIG.ENDPOINTS.AUTH.LOGIN,
    {
      username: email, // FastAPI expects 'username' field
      password,
    }
  );
  return response.data;
};

export const register = async (
  email: string,
  password: string,
  name: string
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(
    API_CONFIG.ENDPOINTS.AUTH.REGISTER,
    {
      email,
      password,
      name,
    }
  );
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.AUTH.ME);
  return response.data;
};

// ==================== Plagiarism Detection ====================

export const checkPlagiarism = async (
  assignmentId: string,
  fileContent: string
): Promise<PlagiarismCheckResponse> => {
  const response = await axiosInstance.post<PlagiarismCheckResponse>(
    API_CONFIG.ENDPOINTS.PLAGIARISM.CHECK,
    {
      assignment_id: assignmentId,
      content: fileContent,
    }
  );
  return response.data;
};

export const getPlagiarismHistory = async (
  assignmentId?: string
): Promise<PlagiarismCheckResponse[]> => {
  const response = await axiosInstance.get<PlagiarismCheckResponse[]>(
    API_CONFIG.ENDPOINTS.PLAGIARISM.HISTORY,
    {
      params: { assignment_id: assignmentId },
    }
  );
  return response.data;
};

// ==================== Assignments ====================

export const getAssignments = async (
  page = 1,
  perPage = 10
): Promise<PaginatedResponse<Assignment>> => {
  const response = await axiosInstance.get<PaginatedResponse<Assignment>>(
    API_CONFIG.ENDPOINTS.ASSIGNMENTS.LIST,
    {
      params: { page, per_page: perPage },
    }
  );
  return response.data;
};

export const createAssignment = async (
  data: Partial<Assignment>
): Promise<Assignment> => {
  const response = await axiosInstance.post<Assignment>(
    API_CONFIG.ENDPOINTS.ASSIGNMENTS.CREATE,
    data
  );
  return response.data;
};

// ==================== Students ====================

export const getStudents = async (
  page = 1,
  perPage = 10
): Promise<PaginatedResponse<Student>> => {
  const response = await axiosInstance.get<PaginatedResponse<Student>>(
    API_CONFIG.ENDPOINTS.STUDENTS.LIST,
    {
      params: { page, per_page: perPage },
    }
  );
  return response.data;
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await axiosInstance.get<Student>(
    `${API_CONFIG.ENDPOINTS.STUDENTS.DETAIL}/${id}`
  );
  return response.data;
};
