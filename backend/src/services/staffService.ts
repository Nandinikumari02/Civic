import prisma from "../lib/prisma";
import { IssueStatus } from "@prisma/client";

export const getMyTasks = async (userId: string) => {
  const staff = await prisma.staff.findUnique({
    where: { userId },
  });

  if (!staff) throw new Error("Staff profile not found");

  return prisma.issue.findMany({
    where: { staffId: staff.id },
    include: {
      citizen: { 
        include: { 
          user: { select: { fullname: true, phoneNumber: true } } 
        } 
      },
      category: true,
      department: { select: { name: true } },
      timeline: { orderBy: { createdAt: 'desc' } },
    },
    orderBy: { updatedAt: "desc" }, // Taaki latest update wala kaam upar dikhe
  });
};

export const updateIssueStatus = async (
  issueId: string,
  status: IssueStatus,
  userId: string // Ye login user ki ID hai (Auth Middleware se)
) => {
  const staff = await prisma.staff.findUnique({
    where: { userId },
  });

  if (!staff) throw new Error("Staff not found");

  // Security Check: Kya ye issue isi staff ko assigned hai?
  const issue = await prisma.issue.findFirst({
    where: { id: issueId, staffId: staff.id }
  });

  if (!issue) throw new Error("This issue is not assigned to you.");

  return prisma.issue.update({
    where: { id: issueId },
    data: {
      status,
      timeline: {
        create: {
          status,
          userId: userId, // ✅ FIX: Schema ke hisaab se yahan user.id jayegi (staff.id nahi)
          comment: `Status updated to ${status} by ${staff.designation}`, // Designation add kar di
        },
      },
    },
  });
};

export const markIssueCompleted = async (
  issueId: string,
  userId: string,
  comment?: string // Optional comment taaki staff bata sake kya kaam kiya
) => {
  const staff = await prisma.staff.findUnique({
    where: { userId },
  });

  if (!staff) throw new Error("Staff not found");

  // Security Check
  const issue = await prisma.issue.findFirst({
    where: { id: issueId, staffId: staff.id }
  });

  if (!issue) throw new Error("Unauthorized: Issue assignment mismatch.");

  return prisma.issue.update({
    where: { id: issueId },
    data: {
      status: "RESOLVED",
      timeline: {
        create: {
          status: "RESOLVED",
          userId: userId, // ✅ FIX: user.id use karni hai
          comment: comment || `Marked as resolved by ${staff.designation}`,
        },
      },
    },
  });
};