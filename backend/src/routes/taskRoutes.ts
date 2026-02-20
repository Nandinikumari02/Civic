import { Router } from "express";
import { getMyTasks, completeTask } from "../controllers/taskController";
import { authenticate, checkRole } from "../middleware/authMiddleware";

const router = Router();

router.get("/my-tasks", authenticate, checkRole(["STAFF"]), getMyTasks);
router.patch("/complete", authenticate, checkRole(["STAFF"]), completeTask);

export default router;