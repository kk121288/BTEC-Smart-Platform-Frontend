import api from './api';
import type { LoginCredentials, AuthResponse, User } from '../types';

/**
 * Login user
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>('/auth/me');
  return response.data;
}

/**
 * Refresh token
 */
export async function refreshToken(): Promise<{ token: string }> {
  const response = await api.post<{ token: string }>('/auth/refresh');
  return response.data;
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<void> {
  await api.post('/auth/forgot-password', { email });
}

/**
 * Reset password
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await api.post('/auth/reset-password', { token, newPassword });
}
