import api from './api';

export const departmentService = {
  // 1. Citizen ke liye saare departments aur categories fetch karna
  // Aapka backend route: router.get("/all", ...)
  getAllDepartments: () => api.get('/departments/all'),

  // 2. Super Admin ke liye naya department banana
  createDepartment: (data: { name: string; description?: string }) => 
    api.post('/departments', data),

  // 3. Dept Admin ke liye category add karna
  createCategory: (data: { name: string; departmentId: string }) => 
    api.post('/departments/category', data),

  // 4. Dept Admin ke liye staff list dekhna
  getMyStaff: () => api.get('/departments/staff'),
};