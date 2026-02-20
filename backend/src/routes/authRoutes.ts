import { Router } from 'express';
import { registerCitizen, login, createStaffOrAdmin } from '../controllers/authController';
import { authenticate, checkRole } from '../middleware/authMiddleware';

const router = Router();

// Public Routes
router.post('/register', registerCitizen);
router.post('/login', login);

// Admin Only Routes (To create Staff or other Admins)
router.post(
    '/create-internal-user', 
    authenticate, 
    checkRole(['SUPER_ADMIN', 'DEPARTMENT_ADMIN']), 
    createStaffOrAdmin
);

export default router;