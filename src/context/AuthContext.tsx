/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '../types/auth';
import { login as apiLogin } from '../services/apiService';
import { setAuthToken, getAuthToken, removeAuthToken } from '../utils/cookieHandler';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export useAuth hook separately to satisfy eslint react-refresh rules
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Check authentication on app load
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const storedToken = getAuthToken();
      if (storedToken) {
        // Verify token with backend (optional - could be a /me endpoint)
        // For now, we'll just trust the stored token
        setToken(storedToken);
        // In a real app, you'd fetch user data from /me endpoint
        // For now, we'll set a placeholder that will be updated on login
        // This will be overwritten when the user actually logs in
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      removeAuthToken();
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      
      // Store token in cookie
      setAuthToken(response.access_token);
      
      // Update state
      setToken(response.access_token);
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    removeAuthToken();
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Default export for the provider component
export default AuthProvider;
