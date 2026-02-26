import api from './api';

// 1. Pehle ye Interface add karein (Isse error solve ho jayega)
interface LoginResponse {
  token: string;
  user: {
    id: string;
    fullname: string;
    email: string;
    role: string;
  };
}

export const authService = {
  // Citizen Registration
  register: (userData: any) => api.post('/auth/register', userData),

  // Login (Ab Typescript ko LoginResponse mil jayega)
  login: async (credentials: any) => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Create Staff & Department Admin
  createInternalUser: (userData: any) => api.post('/auth/create-internal-user', userData),

  // Get Profile
  getProfile: () => api.get('/auth/me'),

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}