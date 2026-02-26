import { Request, Response } from "express";
import prisma from "../lib/prisma"; 

// 1. [SUPER ADMIN] - Naya Department banana (Ab supportedRoles ke saath)
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name, description, supportedRoles } = req.body; 
    
    const newDept = await prisma.department.create({
      data: { 
        name, 
        description,
        // supportedRoles expected as array: ["Lineman", "Supervisor"]
        supportedRoles: supportedRoles || [] 
      },
    });
    
    res.status(201).json({ message: "Department Created with specific roles!", data: newDept });
  } catch (error: any) {
    res.status(400).json({ error: "Department already exists or invalid data" });
  }
};

// 2. [DEPT ADMIN] - Category banana
export const createCategory = async (req: any, res: Response) => {
  try {
    const { name, departmentId } = req.body;

    const adminRecord = await prisma.departmentAdmin.findUnique({
      where: { userId: req.user.userId },
    });

    if (!adminRecord || adminRecord.departmentId !== departmentId) {
      return res.status(403).json({ message: "Access Denied." });
    }

    const newCategory = await prisma.category.create({
      data: { name, departmentId },
    });

    res.status(201).json({ message: "Category added successfully!", data: newCategory });
  } catch (error: any) {
    res.status(400).json({ error: "Category creation failed" });
  }
};

// 3. [DEPT ADMIN] - Staff list (With Designation and Role info)
export const getMyStaff = async (req: any, res: Response) => {
  try {
    const adminRecord = await prisma.departmentAdmin.findUnique({
      where: { userId: req.user.userId },
      include: { 
        department: true // ✅ Yeh include karna zaroori hai roles fetch karne ke liye
      }
    });

    if (!adminRecord) return res.status(403).json({ message: "Not an Admin" });

    const staffList = await prisma.staff.findMany({
      where: { departmentId: adminRecord.departmentId },
      include: {
        user: {
          select: { fullname: true, email: true, phoneNumber: true },
        },
        _count: {
          select: { issues: true } // ✅ Kaam ka workload dekhne ke liye
        }
      },
    });

    res.json({
      staff: staffList,
      // Frontend ko bata rahe hain ki is dept mein kaunse roles allowed hain
      supportedRoles: adminRecord.department.supportedRoles 
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 4. [CITIZEN/ANY] - Saare Departments
// export const getAllDepartments = async (req: Request, res: Response) => {
//   try {
//     const departments = await prisma.department.findMany({
//       include: { 
//         categories: true,
//         _count: {
//           select: { 
//             staff: true,
//             categories: true
//           }
//         }
//       },
//     });
//     res.json(departments);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch departments" });
//   }
// };

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      include: { 
        categories: true,
        // ✅ Schema ke mutabiq naam 'admins' hai
        admins: {
          include: {
            user: {
              select: {
                id: true,
                fullname: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: { 
            staff: true, 
            categories: true 
          }
        }
      },
    });

    // Data format karein taaki Frontend ko adminName mil jaye
    const formattedDepartments = departments.map((dept: any) => ({
      ...dept,
      // Hum array ka pehla admin pick kar rahe hain
      adminName: dept.admins?.[0]?.user?.fullname || null,
      adminId: dept.admins?.[0]?.user?.id || null,
      
    }));

    res.json(formattedDepartments);
  } catch (error) {
    console.error("GET_DEPARTMENTS_ERROR:", error);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};

export const getMyDepartmentRoles = async (req: any, res: Response) => {
  try {
    // 1. Logged-in admin ka record dhoondo aur uska department include karo
    const adminRecord = await prisma.departmentAdmin.findUnique({
      where: { userId: req.user.userId }, // req.user humare middleware se aata hai
      include: {
        department: {
          select: {
            supportedRoles: true, // Sirf roles chahiye
            name: true
          }
        }
      }
    });

    if (!adminRecord) {
      return res.status(404).json({ message: "Department Admin profile not found" });
    }

    // 2. Roles return karo
    res.json({
      department: adminRecord.department.name,
      roles: adminRecord.department.supportedRoles // Ye ["Plumber", "Lineman"] return karega
    });

  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch roles: " + error.message });
  }
};

export const getDepartmentAdmins = async (req: any, res: Response) => {
  try {
    const departmentId = req.params.id;

    if (!departmentId) {
      return res.status(400).json({ message: "Department ID is required" });
    }

    const admins = await prisma.departmentAdmin.findMany({
      where: {
        departmentId: departmentId
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
            phoneNumber: true
          }
        }
      }
    });

    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch department admins"
    });
  }
};