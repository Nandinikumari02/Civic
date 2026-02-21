import { Response } from "express";
import prisma from "../lib/prisma";

// 1. Apni saari notifications dekhna (Citizen, Admin, Staff sabke liye)
export const getMyNotifications = async (req: any, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const unreadCount = await prisma.notification.count({
      where: { userId: req.user.userId, isRead: false }
    });

    res.json({ notifications, unreadCount });
  } catch (error: any) {
    res.status(500).json({ error: "Notification fetch failed" });
  }
};

// 2. Notification ko 'Read' mark karna (Jab user click kare)
export const markAsRead = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });
    res.json({ message: "Marked as read" });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update notification" });
  }
};