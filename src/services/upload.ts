import api from './api';
import type { UploadHistory } from '../types';

/**
 * Upload file with progress tracking
 */
export async function uploadFile(
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ id: string; filename: string; url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });

  return response.data;
}

/**
 * Upload multiple files
 */
export async function uploadFiles(
  files: File[],
  onProgress?: (progress: number) => void
): Promise<{ id: string; filename: string; url: string }[]> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post('/upload/multiple', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });

  return response.data;
}

/**
 * Get upload history
 */
export async function getUploadHistory(): Promise<UploadHistory[]> {
  const response = await api.get<UploadHistory[]>('/upload/history');
  return response.data;
}

/**
 * Delete uploaded file
 */
export async function deleteUploadedFile(id: string): Promise<void> {
  await api.delete(`/upload/${id}`);
}
