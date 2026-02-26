import { Router } from 'express';
import { registerCitizen, login, createStaffOrAdmin, getMe } from '../controllers/authController';
import { authenticate, checkRole, protect } from '../middleware/authMiddleware';

const router = Router();

// Public Routes
router.post('/register', registerCitizen);
router.post('/login', login);

// Admin Only Routes (To create Staff or other Admins)
router.post(
    '/create-internal-user', 
    authenticate, 
    protect,
    checkRole(['SUPER_ADMIN', 'DEPARTMENT_ADMIN']), 
    createStaffOrAdmin
);

router.get('/me', protect, getMe);

export default router;