import { Router } from "express";
import { 
  createDepartment, 
  createCategory, 
  getMyStaff, 
  getAllDepartments, getMyDepartmentRoles,
  getDepartmentAdmins
 
} from "../controllers/deptController";
import { authenticate, checkRole } from "../middleware/authMiddleware";

const router = Router();

// 1. [SUPER ADMIN]: Naya Dept banao (Ab roles bhi pass honge body mein)
router.post("/", authenticate, checkRole(["SUPER_ADMIN"]), createDepartment);

// 3. [DEPT ADMIN]: Category banao (e.g., Pipe Leakage)
router.post("/category", authenticate, checkRole(["DEPARTMENT_ADMIN"]), createCategory);

// 4. [DEPT ADMIN]: Apne staff ki list dekho (Ab designation bhi dikhegi)
router.get("/staff", authenticate, checkRole(["DEPARTMENT_ADMIN"]), getMyStaff);

// 5. [PUBLIC/CITIZEN]: Saare Depts aur Categories dekho (Complaints file karne ke liye)
router.get("/all", authenticate, getAllDepartments);

// Route use kijiye
router.get("/my-roles", authenticate, checkRole(["DEPARTMENT_ADMIN"]), getMyDepartmentRoles);

router.get("/:id/admins",authenticate,checkRole(["SUPER_ADMIN"]),getDepartmentAdmins);

export default router;