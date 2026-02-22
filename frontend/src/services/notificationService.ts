import api from './api';

export const notificationService = {
  // Backend: GET /api/notifications
  getMyNotifications: () => api.get('/notifications'),

  // Backend: PATCH /api/notifications/:id/read
  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),

  // Backend: PATCH /api/notifications/read-all (Optional but good to have)
  markAllAsRead: () => api.patch('/notifications/read-all'),
};