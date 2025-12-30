import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, logAPIError } from '../config/api.config';
import { getAuthToken, removeAuthToken } from '../utils/cookieHandler';

/**
 * Axios Instance Configuration
 * 
 * Features:
 * - Environment-aware base URL
 * - Automatic JWT token injection
 * - 401 auto-logout handling
 * - CORS-friendly headers
 * - Request/response logging (dev only)
 * - Centralized error handling
 */

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  // Enable cookies for CORS requests
  withCredentials: true,
});

// Request Interceptor - Add JWT token to all requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (API_CONFIG.ENABLE_ERROR_LOGGING) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error: AxiosError) => {
    logAPIError(error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (API_CONFIG.ENABLE_ERROR_LOGGING) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - Auto logout
    if (error.response?.status === 401) {
      removeAuthToken();
      window.location.href = '/login';
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }
    
    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server error - please try again later');
    }
    
    // Handle network errors
    if (error.message === 'Network Error') {
      console.error('Network error - check your connection and backend server');
    }
    
    logAPIError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
