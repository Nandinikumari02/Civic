import { Router } from "express";
import { createIssue, getMyIssues, getDeptIssues, assignIssue,  getIssueTimeline } from "../controllers/issueController";
import { authenticate, checkRole } from "../middleware/authMiddleware";



const router = Router();

// Citizen routes
router.post("/", authenticate, checkRole(["CITIZEN"]), createIssue);
router.get("/my", authenticate, checkRole(["CITIZEN"]), getMyIssues);

// Admin route
router.get("/dept", authenticate, checkRole(["DEPARTMENT_ADMIN"]), getDeptIssues);
router.patch("/assign", authenticate, checkRole(["DEPARTMENT_ADMIN"]), assignIssue);



// Issue ki history/timeline dekhne ke liye
router.get("/:id/timeline", authenticate, getIssueTimeline);

export default router;