import api from './api';

export const issueService = {
  // 1. [CITIZEN] 
  // Backend: POST /api/issues/
  createIssue: (data: any) => api.post('/issues', data),
  
  // 2. [CITIZEN] 
  // Backend: GET /api/issues/my (Aapke router ke hisaab se)
  getMyIssues: () => api.get('/issues/my'),

  // 3. [DEPT ADMIN] 
  // Backend: GET /api/issues/dept (Aapke router ke hisaab se)
  getDeptIssues: () => api.get('/issues/dept'),

  // 4. [SUPER ADMIN]
  // Backend: GET /api/issues/all
  getAllIssues: () => api.get('/issues/all'), 

  // 5. [DEPT ADMIN] 
  // Backend: PATCH /api/issues/assign
  assignIssue: (data: {issueId: string, staffId: string, comment?: string}) => 
    api.patch('/issues/assign', data),

  // 6. [COMMON] 
  // Backend: GET /api/issues/:id/timeline
  getTimeline: (issueId: string) => api.get(`/issues/${issueId}/timeline`),
};