import { Router } from "express";
import { authenticate, checkRole } from "../middleware/authMiddleware";
import { getDeptDashboardStats, getSuperAdminDashboardStats } from "../controllers/dashboardController";

const router = Router();

router.get("/dashboard/stats", authenticate, checkRole(["DEPARTMENT_ADMIN"]), getDeptDashboardStats);
// Super Admin Dashboard Route
router.get("/super-admin/stats", authenticate, checkRole(["SUPER_ADMIN"]), getSuperAdminDashboardStats);
