import prisma from "../lib/prisma";
import { IssueStatus } from "@prisma/client";

interface CreateIssueInput {
  title: string;
  description: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  address?: string;
  departmentId: string;
  categoryId: string;
}

export const createIssue = async (
  citizenUserId: string,
  data: CreateIssueInput
) => {
  const citizen = await prisma.citizen.findUnique({
    where: { userId: citizenUserId },
  });

  if (!citizen) throw new Error("Citizen profile not found");

  // validate category belongs to department
  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });

  if (!category || category.departmentId !== data.departmentId) {
    throw new Error("Invalid category for selected department");
  }

  return prisma.issue.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      latitude: data.latitude,
      longitude: data.longitude,
      address: data.address,
      citizenId: citizen.id,
      departmentId: data.departmentId,
      categoryId: data.categoryId,
      status: IssueStatus.SUBMITTED,
      timeline: {
        create: [
          {
            status: IssueStatus.SUBMITTED,
            comment: "Issue submitted by citizen",
            changedBy: citizenUserId,
          },
        ],
      },
    },
  });
};

export const getCitizenIssues = async (citizenUserId: string) => {
  return prisma.issue.findMany({
    where: {
      citizen: {
        userId: citizenUserId,
      },
    },
    include: {
      category: true,
      department: true,
      timeline: { orderBy: { createdAt: "desc" } },
    },
    orderBy: { createdAt: "desc" },
  });
};
