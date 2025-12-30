export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationPriority = 'low' | 'normal' | 'high';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  read: boolean;
  timestamp: number;
  action?: {
    label: string;
    url: string;
  };
}
