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
      citizen: { include: { user: true } },
      category: true,
      department: true,
      timeline: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateIssueStatus = async (
  issueId: string,
  status: IssueStatus,
  userId: string
) => {
  const staff = await prisma.staff.findUnique({
    where: { userId },
  });

  if (!staff) throw new Error("Staff not found");

  return prisma.issue.update({
    where: { id: issueId },
    data: {
      status,
      timeline: {
        create: {
          status,
          changedBy: staff.id,
          comment: `Status updated to ${status}`,
        },
      },
    },
  });
};

export const markIssueCompleted = async (
  issueId: string,
  userId: string
) => {
  const staff = await prisma.staff.findUnique({
    where: { userId },
  });

  if (!staff) throw new Error("Staff not found");

  return prisma.issue.update({
    where: { id: issueId },
    data: {
      status: "RESOLVED",
      timeline: {
        create: {
          status: "RESOLVED",
          changedBy: staff.id,
          comment: "Marked completed by staff",
        },
      },
    },
  });
};
