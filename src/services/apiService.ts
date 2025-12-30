import axiosInstance from '../api/axiosInstance';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  PlagiarismCheckRequest,
  PlagiarismReport,
} from '../types/auth';

// Login API call
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const requestData: LoginRequest = {
    username: email,
    password: password,
  };

  const response = await axiosInstance.post<AuthResponse>('/token', requestData);
  return response.data;
};

// Register API call (placeholder endpoint)
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  const requestData: RegisterRequest = {
    email,
    password,
    name,
  };

  const response = await axiosInstance.post<User>('/register', requestData);
  return response.data;
};

// Check plagiarism API call
export const checkPlagiarism = async (
  assignmentId: string,
  fileContent: string
): Promise<PlagiarismReport> => {
  const requestData: PlagiarismCheckRequest = {
    assignmentId,
    fileContent,
  };

  const response = await axiosInstance.post<PlagiarismReport>(
    '/plagiarism/check',
    requestData
  );
  return response.data;
};
