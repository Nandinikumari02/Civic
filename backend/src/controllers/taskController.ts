import { Response } from "express";
import prisma from "../lib/prisma";
import { IssueStatus, TaskStatus } from "@prisma/client";

// 1. [STAFF] - Apne saare assigned Tasks/Issues dekhna
export const getMyTasks = async (req: any, res: Response) => {
  try {
    const staffRecord = await prisma.staff.findUnique({
      where: { userId: req.user.userId }
    });

    if (!staffRecord) return res.status(403).json({ message: "Staff record not found" });

    // Hum Task table se data uthayenge kyunki assignment wahan hoti hai
    const tasks = await prisma.task.findMany({
      where: { staffId: staffRecord.id },
      include: {
        issue: {
          include: {
            category: { select: { name: true } },
            citizen: { select: { user: { select: { fullname: true } } } },
            timeline: { orderBy: { createdAt: 'desc' }, take: 1 }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch tasks: " + error.message });
  }
};

// 2. [STAFF] - Task poora karna (Issue Resolve karna)
export const completeTask = async (req: any, res: Response) => {
  try {
    const { taskId, status } = req.body;

    const staffRecord = await prisma.staff.findUnique({
      where: { userId: req.user.userId }
    });

    // Task dhoondna aur check karna ki ye isi staff ka hai
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { issue: true }
    });

    if (!task || task.staffId !== staffRecord?.id) {
      return res.status(403).json({ message: "Unauthorized or Task not found" });
    }

    // Transaction: Task aur Issue dono update honge
    await prisma.$transaction(async (tx) => {
      // A. Task Table Update
      await tx.task.update({
        where: { id: taskId },
        data: { status: TaskStatus.COMPLETED }
      });

      // B. Issue Table Update
      if (task.issueId) {
       const updatedIssue = await tx.issue.update({
          where: { id: task.issueId },
          data: { status: IssueStatus.RESOLVED },
          include: { citizen: true }
        });

        // C. Timeline Entry
        await tx.issueTimeline.create({
          data: {
            issueId: task.issueId,
            status: IssueStatus.RESOLVED,
            userId: req.user.userId,
            comment:"Task completed by staff."
          }
        });
        // Issue Resolved Notification
        await tx.notification.create({
          data: {
            userId: updatedIssue.citizen.userId,
            message: `Great news! Your issue "${updatedIssue.title}" has been RESOLVED.`
          }
        });

        //Reward Point Added
        await tx.reward.create({
      data: {
        userId: updatedIssue.citizen.userId,
        points: 50, // Fix 50 points per resolved issue
        badgeName: "Contributor"
      }
    });

   // Notification For Points
    await tx.notification.create({
      data: {
        userId: updatedIssue.citizen.userId,
        message: `Congratulations! You earned 50 reward points for your resolved issue.`
      }
    });
      }
    });

    res.json({ message: "Task marked as COMPLETED and Issue RESOLVED" });
  } catch (error: any) {
    res.status(500).json({ error: "Update failed: " + error.message });
  }
};