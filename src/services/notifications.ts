import { apiClient } from '@/lib/api-client';
import type { Notification } from '@/types/notification';

export const notificationService = {
  /**
   * Get all notifications
   */
  async getAll(): Promise<Notification[]> {
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  /**
   * Mark notification as read
   */
  async markAsRead(id: string): Promise<void> {
    await apiClient.post(`/notifications/mark-read/${id}`);
  },

  /**
   * Delete notification
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`);
  },

  /**
   * Clear all notifications
   */
  async clearAll(): Promise<void> {
    await apiClient.delete('/notifications/all');
  },
};
