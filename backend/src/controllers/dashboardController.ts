import prisma from "../lib/prisma";
import { Response } from "express";

export const getDeptDashboardStats = async (req: any, res: Response) => {
  try {
    // 1. Admin ka department nikalna
    const adminRecord = await prisma.departmentAdmin.findUnique({
      where: { userId: req.user.userId }
    });

    if (!adminRecord) return res.status(403).json({ message: "Unauthorized" });

    const deptId = adminRecord.departmentId;

    // 2. Saare stats ek saath parallel mein nikalna (Performance ke liye)
    const [totalIssues, pendingIssues, resolvedIssues, staffCount] = await Promise.all([
      prisma.issue.count({ where: { departmentId: deptId } }),
      prisma.issue.count({ where: { departmentId: deptId, status: "OPEN" } }),
      prisma.issue.count({ where: { departmentId: deptId, status: "RESOLVED" } }),
      prisma.staff.count({ where: { departmentId: deptId } })
    ]);

    // 3. Category-wise breakdown (Chart ke liye)
    const categoryStats = await prisma.issue.groupBy({
      by: ['categoryId'],
      where: { departmentId: deptId },
      _count: { id: true }
    });

    // 4. Latest 5 Issues (Recent Activity ke liye)
    const recentIssues = await prisma.issue.findMany({
      where: { departmentId: deptId },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { citizen: { select: { user: { select: { fullname: true } } } } }
    });

    res.json({
      summary: {
        total: totalIssues,
        pending: pendingIssues,
        resolved: resolvedIssues,
        staffActive: staffCount
      },
      categoryStats,
      recentIssues
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getSuperAdminDashboardStats = async (req: any, res: Response) => {
  try {
    // 1. Overall Totals (Poore System Ka)
    const [totalIssues, totalCitizens, totalStaff, totalDepts] = await Promise.all([
      prisma.issue.count(),
      prisma.citizen.count(),
      prisma.staff.count(),
      prisma.department.count()
    ]);

    // 2. Status-wise Breakdown (Global)
    const statusStats = await prisma.issue.groupBy({
      by: ['status'],
      _count: { id: true }
    });

    // 3. Department-wise Comparison (Chart ke liye sabse important)
    // Ye batayega ki kis dept mein kitne issues hain
    const deptStats = await prisma.department.findMany({
      select: {
        name: true,
        _count: {
          select: { issues: true }
        }
      }
    });

    // 4. Monthly Trend (Taaki graph ban sake ki complaints badh rahi hain ya ghat rahi hain)
    // Note: Iske liye hum pichle 6 mahine ka data group kar sakte hain
    const monthlyIssues = await prisma.$queryRaw`
      SELECT TO_CHAR("createdAt", 'Mon') as month, COUNT(id) as count
      FROM "Issue"
      GROUP BY month
      LIMIT 6
    `;

    res.json({
      globalSummary: {
        totalIssues,
        totalCitizens,
        totalStaff,
        totalDepts
      },
      statusBreakdown: statusStats,
      departmentComparison: deptStats,
      trends: monthlyIssues
    });

  } catch (error: any) {
    res.status(500).json({ error: "Super Admin stats failed: " + error.message });
  }
};