import api from './api';

export const taskService = {
  // 1. [STAFF]: Dekhna ki mujhe aaj kaunse kaam karne hain
  // Backend: GET /api/tasks/my-tasks
  getMyTasks: () => api.get('/tasks/my-tasks'),

  // 2. [STAFF]: Kaam shuru karte waqt ya beech mein status update karna
  // Backend: PATCH /api/tasks/status (Agar aapne ye banaya ho)
  updateTaskStatus: (taskId: string, status: string) => 
    api.patch('/tasks/status', { taskId, status }),

  // 3. [STAFF]: Kaam poora hone par (Final Resolution)
  // Backend: PATCH /api/tasks/complete
  completeTask: (taskId: string) => 
    api.patch('/tasks/complete', { taskId }),
};