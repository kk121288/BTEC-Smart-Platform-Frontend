import { useState } from 'react';
import * as uploadService from '../services/upload';
import type { UploadProgress } from '../types';

export function useUpload() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);

      // Initialize progress
      const progress: UploadProgress = {
        filename: file.name,
        progress: 0,
        status: 'uploading',
      };
      setUploadProgress([progress]);

      // Upload file
      const result = await uploadService.uploadFile(file, (progressValue) => {
        setUploadProgress([
          {
            ...progress,
            progress: progressValue,
          },
        ]);
      });

      // Update to success
      setUploadProgress([
        {
          filename: file.name,
          progress: 100,
          status: 'success',
        },
      ]);

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      setUploadProgress([
        {
          filename: file.name,
          progress: 0,
          status: 'error',
          error: errorMessage,
        },
      ]);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultiple = async (files: File[]) => {
    try {
      setIsUploading(true);
      setError(null);

      // Initialize progress for all files
      const initialProgress: UploadProgress[] = files.map((file) => ({
        filename: file.name,
        progress: 0,
        status: 'uploading' as const,
      }));
      setUploadProgress(initialProgress);

      // Upload files
      const results = await uploadService.uploadFiles(files, (progressValue) => {
        setUploadProgress(
          initialProgress.map((p) => ({
            ...p,
            progress: progressValue,
          }))
        );
      });

      // Update to success
      setUploadProgress(
        files.map((file) => ({
          filename: file.name,
          progress: 100,
          status: 'success' as const,
        }))
      );

      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      setUploadProgress(
        files.map((file) => ({
          filename: file.name,
          progress: 0,
          status: 'error' as const,
          error: errorMessage,
        }))
      );
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setUploadProgress([]);
    setError(null);
    setIsUploading(false);
  };

  return {
    upload,
    uploadMultiple,
    uploadProgress,
    isUploading,
    error,
    reset,
  };
}
