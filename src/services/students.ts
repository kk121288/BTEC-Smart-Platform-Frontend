import api from './api';
import type { Student, StudentFilters, PaginatedResponse } from '../types';

/**
 * Get all students with optional filters
 */
export async function getStudents(
  filters?: StudentFilters,
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedResponse<Student>> {
  const response = await api.get<PaginatedResponse<Student>>('/students', {
    params: { ...filters, page, perPage },
  });
  return response.data;
}

/**
 * Get student by ID
 */
export async function getStudentById(id: string): Promise<Student> {
  const response = await api.get<Student>(`/students/${id}`);
  return response.data;
}

/**
 * Create new student
 */
export async function createStudent(student: Omit<Student, 'id'>): Promise<Student> {
  const response = await api.post<Student>('/students', student);
  return response.data;
}

/**
 * Update student
 */
export async function updateStudent(id: string, student: Partial<Student>): Promise<Student> {
  const response = await api.put<Student>(`/students/${id}`, student);
  return response.data;
}

/**
 * Delete student
 */
export async function deleteStudent(id: string): Promise<void> {
  await api.delete(`/students/${id}`);
}

/**
 * Delete multiple students
 */
export async function deleteStudents(ids: string[]): Promise<void> {
  await api.post('/students/bulk-delete', { ids });
}

/**
 * Search students
 */
export async function searchStudents(query: string): Promise<Student[]> {
  const response = await api.get<Student[]>('/students/search', {
    params: { q: query },
  });
  return response.data;
}
