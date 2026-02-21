import {Request, Response} from "express";
import prisma from "../lib/prisma";
import { IssueStatus } from "@prisma/client";


//[CITIZEN] -NEW COMPLAINT
export const createIssue = async (req: any , res: Response) => {
    try {
        const {
            title,
            description,
            latitude,
            longitude,
            departmentId,
            categoryId
        } = req.body;

        const citizenRecord = await prisma.citizen.findUnique({
            where: {userId: req.user.userId}
        });

        if(!citizenRecord) return res.status(403).json({message: "Only citizen can report Issue"});

        const newIssue = await prisma.issue.create({
            data: {
                title,
                description,
                latitude,
                longitude,
                status: IssueStatus.OPEN,
                citizenId: citizenRecord.id,
                departmentId,
                categoryId
            }
        });
        res.status(201).json({message: "Issue Reported Sucessfully", data: newIssue});
    } catch(error:any){
        res.status(500).json({error: "Could not file issue: " +error.message });

    }
};

// 2. [CITIZEN] - Apni saari Shikayatein dekhna
export const getMyIssues = async (req: any, res: Response) => {
  try {
    const citizenRecord = await prisma.citizen.findUnique({
      where: { userId: req.user.userId }
    });

    const issues = await prisma.issue.findMany({
      where: { citizenId: citizenRecord?.id },
      include: { 
        department: { select: { name: true } },
        category: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your issues" });
  }
};

// 3. [DEPT ADMIN] - Apne Department ki saari complaints dekhna
export const getDeptIssues = async (req: any, res: Response) => {
  try {
    const adminRecord = await prisma.departmentAdmin.findUnique({
      where: { userId: req.user.userId }
    });

    if (!adminRecord) return res.status(403).json({ message: "Not an Admin" });

    const issues = await prisma.issue.findMany({
      where: { departmentId: adminRecord.departmentId },
      include: { 
        citizen: { include: { user: { select: { fullname: true } } } },
        category: true 
      }
    });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 4. [DEPT ADMIN] - Issue ko Staff ko assign karna
export const assignIssue = async (req: any, res: Response) => {
  try {
    const { issueId, staffId, comment } = req.body;

    // 1. Check if Admin exists and get their departmentId
    const adminRecord = await prisma.departmentAdmin.findUnique({
      where: { userId: req.user.userId }
    });

    if (!adminRecord) {
      return res.status(403).json({ message: "Unauthorized: Only Dept Admin can assign." });
    }

    // 2. Transaction shuru karte hain
    const result = await prisma.$transaction(async (tx) => {
      
      // A. Issue update karein (Status aur Staff)
      const updatedIssue = await tx.issue.update({
        where: { id: issueId },
        include: { citizen: true, staff: { include: { user: true } } },
        data: {
          staffId: staffId,
          status: "IN_PROGRESS" // IssueStatus enum se
        }
      });
            // 1. Staff ko batana
      await tx.notification.create({
        data: {
          userId: updatedIssue.staff!.userId,
          message: `New Task: You have been assigned to #${updatedIssue.title}.`
        }
      });

      // 2. Citizen ko batana
      await tx.notification.create({
        data: {
          userId: updatedIssue.citizen.userId,
          message: `Your issue "${updatedIssue.title}" is now IN_PROGRESS. Assigned to: ${updatedIssue.staff?.user.fullname}`
        }
      });

      // B. TASK Create karein (Ab saari mandatory fields ke saath)
      const newTask = await tx.task.create({
        data: {
          title: `Fix: ${updatedIssue.title}`, // Issue ka title use kar liya
          description: comment || updatedIssue.description, // Admin ka comment ya issue ki details
          status: "PENDING", // TaskStatus enum se
          issueId: issueId,
          staffId: staffId,
          departmentId: adminRecord.departmentId // Ye aapke schema mein required hai
        }
      });

      // C. Timeline entry create karein
      await tx.issueTimeline.create({
        data: {
          issueId: issueId,
          status: "IN_PROGRESS",
          userId: req.user.userId,
          comment: comment || "Task assigned to staff member."
        }
      });

      return { updatedIssue, newTask };
    });

    res.json({
      message: "Assignment successful!",
      issue: result.updatedIssue,
      task: result.newTask
    });

  } catch (error: any) {
    console.error("Assignment Error:", error);
    res.status(500).json({ error: "Assignment failed", details: error.message });
  }
};


export const getIssueTimeline = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const issue = await prisma.issue.findUnique({
      where: { id },
      include: {
        timeline: {
          include: {
            changedBy: { select: { fullname: true, role: true } }
          },
          orderBy: { createdAt: 'asc' } // Purane se naya (Timeline flow)
        },
        department: { select: { name: true } },
        citizen: { select: { user: { select: { fullname: true } } } }
      }
    });

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    res.json(issue);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
