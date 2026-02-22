import api from './api';

export const authService = {
    // 1. Citizen Registration (Backend: /auth/register)
  register: (userData: any) => api.post('/auth/register' , userData),

    // 2. Login (Backend: /auth/login)
  login: (credentials: any) => api.post('/auth/login', credentials),

  //3.Create Staff & Department(Backend: /auth/create-internal-user)

  createInternalUser: (userData: any) => api.post('/auth/create-internal-user', userData),

  getProfile: () => api.get('/auth/me'),

// 4. Logout (Local logic)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}