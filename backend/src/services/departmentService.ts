import { PrismaClient, IssueStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const getDepartmentIssues = async (userId: string) => {
    const admin = await prisma.departmentAdmin.findUnique({
        where: { userId },
    });
    if (!admin) throw new Error("Admin profile not found");

    return prisma.issue.findMany({
        where: { departmentId: admin.departmentId },
        include: {
            // Humne zaroori fields select kar li taaki data heavy na ho
            citizen: { include: { user: { select: { fullname: true, phoneNumber: true } } } },
            category: true,
            // Staff ki designation bhi fetch kar rahe hain
            staff: { include: { user: { select: { fullname: true } } } },
            timeline: { orderBy: { createdAt: 'desc' } }, // Latest update sabse upar
        },
        orderBy: { createdAt: "desc" },
    });
};

export const assignIssueToStaff = async (
    issueId: string,
    staffId: string,
    adminUserId: string
) => {
    // 1. Admin verification
    const admin = await prisma.departmentAdmin.findUnique({
        where: { userId: adminUserId },
    });
    if (!admin) throw new Error("Admin not found");

    // 2. Staff validation + Designation fetch
    const staff = await prisma.staff.findUnique({
        where: { id: staffId },
        include: { user: { select: { fullname: true } } }
    });

    if (!staff || staff.departmentId !== admin.departmentId)
        throw new Error("Staff does not belong to your department");

    // 3. Issue validation
    const issue = await prisma.issue.findUnique({
        where: { id: issueId },
    });

    if (!issue || issue.departmentId !== admin.departmentId)
        throw new Error("Issue does not belong to your department");

    // 4. Update with Production-level Timeline comment
    return prisma.issue.update({
        where: { id: issueId },
        data: {
            staffId,
            status: IssueStatus.IN_PROGRESS,
            timeline: {
                create: {
                    status: IssueStatus.IN_PROGRESS,
                    // Yahan hum staff ka naam aur designation dono save kar rahe hain
                    comment: `Task assigned to ${staff.user.fullname} (${staff.designation})`, 
                    userId: adminUserId, // Prisma isse automatic connect kar lega schema ke hisaab se
                },
            },
        },
    });
};