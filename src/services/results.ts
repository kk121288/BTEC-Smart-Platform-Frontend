import api from './api';
import type { Result, ResultFilters, PaginatedResponse } from '../types';

/**
 * Get results with filters
 */
export async function getResults(
  filters?: ResultFilters,
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedResponse<Result>> {
  const response = await api.get<PaginatedResponse<Result>>('/results', {
    params: { ...filters, page, perPage },
  });
  return response.data;
}

/**
 * Get result by ID
 */
export async function getResultById(id: string): Promise<Result> {
  const response = await api.get<Result>(`/results/${id}`);
  return response.data;
}

/**
 * Export results
 */
export async function exportResults(
  format: 'csv' | 'pdf',
  filters?: ResultFilters
): Promise<Blob> {
  const response = await api.post(
    '/results/export',
    { filters, format },
    { responseType: 'blob' }
  );
  return response.data;
}

/**
 * Get result statistics
 */
export async function getResultStatistics(filters?: ResultFilters): Promise<{
  average: number;
  highest: number;
  lowest: number;
  totalSubmissions: number;
  passRate: number;
}> {
  const response = await api.get('/results/statistics', {
    params: filters,
  });
  return response.data;
}
