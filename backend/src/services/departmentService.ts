import { PrismaClient, IssueStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const getDepartmentIssues = async (userId: string) => {
    const admin = await prisma.departmentAdmin.findUnique({
        where: {userId},
    });
    if(!admin) throw new Error("Admin proofile not found");

    return prisma.issue.findMany({
    where: { departmentId: admin.departmentId },
    include: {
      citizen: { include: { user: true } },
      category: true,
      staff: { include: { user: true } },
      timeline: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const assignIssueToStaff = async (
  issueId: string,
  staffId: string,
  adminUserId: string
) => {
  const admin = await prisma.departmentAdmin.findUnique({
    where: { userId: adminUserId },
  });

  if (!admin) throw new Error("Admin not found");

  const staff = await prisma.staff.findUnique({
    where: { id: staffId },
  });

  if (!staff || staff.departmentId !== admin.departmentId)
    throw new Error("Staff does not belong to your department");

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue || issue.departmentId !== admin.departmentId)
    throw new Error("Issue does not belong to your department");

  return prisma.issue.update({
    where: { id: issueId },
    data: {
      staffId,
      status: IssueStatus.IN_PROGRESS,
      timeline: {
        create: {
          status: IssueStatus.IN_PROGRESS,
          comment: "Assigned to staff",
          changedBy: adminUserId,
        },
      },
    },
  });
};
