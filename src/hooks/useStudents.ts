import { useState, useEffect } from 'react';
import * as studentsService from '../services/students';
import type { Student, StudentFilters } from '../types';

export function useStudents(initialFilters?: StudentFilters) {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<StudentFilters>(initialFilters || {});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await studentsService.getStudents(filters, page, 10);
      setStudents(response.data);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch students';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters, page]);

  const createStudent = async (student: Omit<Student, 'id'>) => {
    try {
      setError(null);
      const newStudent = await studentsService.createStudent(student);
      await fetchStudents(); // Refresh list
      return newStudent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create student';
      setError(errorMessage);
      throw err;
    }
  };

  const updateStudent = async (id: string, student: Partial<Student>) => {
    try {
      setError(null);
      const updatedStudent = await studentsService.updateStudent(id, student);
      await fetchStudents(); // Refresh list
      return updatedStudent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update student';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      setError(null);
      await studentsService.deleteStudent(id);
      await fetchStudents(); // Refresh list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete student';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteMultiple = async (ids: string[]) => {
    try {
      setError(null);
      await studentsService.deleteStudents(ids);
      await fetchStudents(); // Refresh list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete students';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    students,
    isLoading,
    error,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    total,
    refetch: fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    deleteMultiple,
  };
}
