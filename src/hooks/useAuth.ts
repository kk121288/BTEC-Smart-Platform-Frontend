import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import * as authService from '../services/auth';
import type { LoginCredentials } from '../types';

export function useAuth() {
  const { user, isAuthenticated, login: loginStore, logout: logoutStore, setLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      loginStore(response.user, response.token);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      logoutStore();
    } catch (err) {
      // Even if API call fails, logout locally
      logoutStore();
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();
      useAuthStore.getState().setUser(currentUser);
      return currentUser;
    } catch (err) {
      logoutStore();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    error,
    isLoading: useAuthStore.getState().isLoading,
  };
}
