import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useUpload } from '../hooks/useUpload';
import { formatFileSize } from '../lib/utils';

export default function Upload() {
  const { upload, uploadProgress, isUploading, reset } = useUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await upload(selectedFile);
      // Reset after successful upload
      setTimeout(() => {
        setSelectedFile(null);
        reset();
      }, 2000);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Upload Assignment
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Upload assignment files for grading
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-12 transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
              />
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <UploadIcon className="text-white" size={32} />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Drop your file here, or{' '}
                  <label htmlFor="file-upload" className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                    browse
                  </label>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supports: PDF, DOC, DOCX, XLS, XLSX, ZIP (Max 50MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Preview */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <File className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                {!isUploading && uploadProgress.length === 0 && (
                  <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-500 dark:text-gray-400" />
                  </button>
                )}
              </div>

              {/* Upload Progress */}
              {uploadProgress.length > 0 && (
                <div className="space-y-2">
                  {uploadProgress[0].status === 'uploading' && (
                    <>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Uploading...</span>
                        <span>{uploadProgress[0].progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress[0].progress}%` }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>
                    </>
                  )}

                  {uploadProgress[0].status === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle size={20} />
                      <span className="font-medium">Upload successful!</span>
                    </div>
                  )}

                  {uploadProgress[0].status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertCircle size={20} />
                      <span className="font-medium">
                        Upload failed: {uploadProgress[0].error}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Upload Button */}
              {!isUploading && uploadProgress.length === 0 && (
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    onClick={handleUpload}
                    className="flex-1"
                    icon={<UploadIcon size={18} />}
                  >
                    Upload File
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No upload history yet
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
