/**
 * API Configuration
 * 
 * Centralized configuration for API base URL, timeouts, and environment settings.
 * Uses Vite environment variables (import.meta.env).
 */

export const API_CONFIG = {
  // Base URL - defaults to localhost if not set
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Request timeout in milliseconds
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  
  // Enable detailed error logging
  ENABLE_ERROR_LOGGING: import.meta.env.VITE_ENABLE_ERROR_LOGGING === 'true',
  
  // Secure cookies (true in production)
  SECURE_COOKIES: import.meta.env.VITE_SECURE_COOKIES === 'true',
  
  // Current environment
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/token',
      REGISTER: '/register',
      LOGOUT: '/logout',
      REFRESH: '/refresh',
      ME: '/users/me',
    },
    PLAGIARISM: {
      CHECK: '/api/plagiarism/check',
      HISTORY: '/api/plagiarism/history',
      REPORT: '/api/plagiarism/report',
    },
    ASSIGNMENTS: {
      LIST: '/api/assignments',
      CREATE: '/api/assignments',
      UPDATE: '/api/assignments',
      DELETE: '/api/assignments',
    },
    STUDENTS: {
      LIST: '/api/students',
      DETAIL: '/api/students',
    },
  },
} as const;

// Helper to check if running in production
export const isProduction = () => API_CONFIG.ENVIRONMENT === 'production';

// Helper to check if running in development
export const isDevelopment = () => API_CONFIG.ENVIRONMENT === 'development';

// Helper to log API errors (only in development)
export const logAPIError = (error: unknown) => {
  if (API_CONFIG.ENABLE_ERROR_LOGGING) {
    console.error('[API Error]', error);
  }
};
