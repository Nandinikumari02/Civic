import { Request, Response } from "express";
import prisma from "../lib/prisma"; 

// 1. [SUPER ADMIN] - Naya Department banana (e.g. Water, Electricity)
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newDept = await prisma.department.create({
      data: { name, description },
    });
    res.status(201).json({ message: "Department Created!", data: newDept });
  } catch (error: any) {
    res.status(400).json({ error: "Department already exists" });
  }
};

// 2. [DEPT ADMIN] - Apne department mein Category banana (e.g. Pipe Leakage)
export const createCategory = async (req: any, res: Response) => {
  try {
    const { name, departmentId } = req.body;

    // Security Check: Kya logged-in user isi department ka admin hai?
    const adminRecord = await prisma.departmentAdmin.findUnique({
      where: { userId: req.user.userId },
    });

    if (!adminRecord || adminRecord.departmentId !== departmentId) {
      return res.status(403).json({
        message: "Access Denied.",
      });
    }

    const newCategory = await prisma.category.create({
      data: { name, departmentId },
    });

    res.status(201).json({ message: "Category added successfully!", data: newCategory });
  } catch (error: any) {
    res.status(400).json({ error: "Category creation failed" });
  }
};

// 3. [DEPT ADMIN] - Apne department ke Staff ki list dekhna
export const getMyStaff = async (req: any, res: Response) => {
  try {
    const adminRecord = await prisma.departmentAdmin.findUnique({
      where: { userId: req.user.userId },
    });

    if (!adminRecord) return res.status(403).json({ message: "Not an Admin" });

    const staffList = await prisma.staff.findMany({
      where: { departmentId: adminRecord.departmentId },
      include: {
        user: {
          select: { fullname: true, email: true, phoneNumber: true }, // Sirf zaroori details
        },
      },
    });

    res.json(staffList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 4. [CITIZEN/ANY] - Saare Departments ki list dekhna (Dropdown ke liye)
export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      include: { 
        categories: true,
        _count: {
          select: { 
            staff: true,      // Yeh staff ka count laayega
            categories: true  // Yeh categories ka count laayega
          }
        }
      },
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};