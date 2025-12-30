import { useState, useEffect } from 'react';
import * as resultsService from '../services/results';
import type { Result, ResultFilters } from '../types';

export function useResults(initialFilters?: ResultFilters) {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ResultFilters>(initialFilters || {});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statistics, setStatistics] = useState<{
    average: number;
    highest: number;
    lowest: number;
    totalSubmissions: number;
    passRate: number;
  } | null>(null);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await resultsService.getResults(filters, page, 10);
      setResults(response.data);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch results';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const stats = await resultsService.getResultStatistics(filters);
      setStatistics(stats);
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    }
  };

  useEffect(() => {
    fetchResults();
    fetchStatistics();
  }, [filters, page]);

  const exportData = async (format: 'csv' | 'pdf') => {
    try {
      setError(null);
      const blob = await resultsService.exportResults(format, filters);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `results-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export results';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    results,
    isLoading,
    error,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    total,
    statistics,
    refetch: fetchResults,
    exportData,
  };
}
