import { Router } from "express";
import { 
  createDepartment, 
  createCategory, 
  getMyStaff, 
  getAllDepartments 
} from "../controllers/deptController";
import { authenticate, checkRole } from "../middleware/authMiddleware";

const router = Router();

// 1. Super Admin: Naya Dept banao
router.post("/", authenticate, checkRole(["SUPER_ADMIN"]), createDepartment);

// 2. Dept Admin: Category banao
router.post("/category", authenticate, checkRole(["DEPARTMENT_ADMIN"]), createCategory);

// 3. Dept Admin: Apne staff ki list dekho
router.get("/staff", authenticate, checkRole(["DEPARTMENT_ADMIN"]), getMyStaff);

// 4. Public/Citizen: Saare Depts aur Categories dekho
router.get("/all", authenticate, getAllDepartments);

export default router;