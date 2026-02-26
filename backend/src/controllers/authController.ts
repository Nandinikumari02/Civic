import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// --- 1. CITIZEN REGISTRATION (Public) ---
export const registerCitizen = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phoneNumber, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullname, email, phoneNumber, passwordHash,
        role: 'CITIZEN',
        citizen: { create: {} } // Citizen table link
      }
    });
    res.status(201).json({ message: "Citizen registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Email or Phone already exists" });
  }
};


// controllers/authController.ts

// export const createStaffOrAdmin = async (req: any, res: Response) => {
//   try {
//     const { fullname, email, phoneNumber, password, role, designation } = req.body;
//     let { departmentId } = req.body;

//     // Production Level Check: Agar Dept Admin hai toh validation lagao
//     if (req.user.role === 'DEPARTMENT_ADMIN') {
//       const adminProfile = await prisma.departmentAdmin.findUnique({
//         where: { userId: req.user.id },
//         include: { department: true } // Department ke roles bhi saath mein lao
//       });

//       if (!adminProfile) return res.status(403).json({ error: "Admin profile not found" });

//       // Check: Kya designation supportedRoles mein hai?
//       if (!adminProfile.department.supportedRoles.includes(designation)) {
//         return res.status(400).json({ 
//           error: `Invalid designation. Allowed: ${adminProfile.department.supportedRoles.join(", ")}` 
//         });
//       }

//       departmentId = adminProfile.departmentId; // Admin ka apna dept
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const newUser = await prisma.user.create({
//       data: {
//         fullname, email, phoneNumber, passwordHash, role,
//         ...(role === 'STAFF' && { 
//           staff: { create: { departmentId, designation } } 
//         }),
//         ...(role === 'DEPARTMENT_ADMIN' && { 
//           departmentAdmin: { create: { departmentId } } 
//         })
//       }
//     });

//     res.status(201).json({ message: "User created with verified role" });
//   } catch (error) {
//     res.status(500).json({ error: "Error in creation" });
//   }
// };

export const createStaffOrAdmin = async (req: any, res: Response) => {
  try {
    let { fullname, email, phoneNumber, password, role, departmentId, designation } = req.body;

    // 1. Basic Check: Role hierarchy
    if (role === 'SUPER_ADMIN') {
        return res.status(403).json({ error: "Cannot create SUPER_ADMIN via this endpoint" });
    }

    // 2. DEPARTMENT_ADMIN Logic
    if (req.user.role === 'DEPARTMENT_ADMIN') {
      if (role !== 'STAFF') {
        return res.status(403).json({ error: "Department Admins can only create STAFF" });
      }

      const adminProfile = await prisma.departmentAdmin.findUnique({
        where: { userId: req.user.id },
        include: { department: true },
      });

      if (!adminProfile) return res.status(403).json({ error: "Admin profile not found" });

      departmentId = adminProfile.departmentId; // Override to admin's department

      // Validate designation against department supportedRoles
      if (designation && !adminProfile.department.supportedRoles.includes(designation)) {
        return res.status(400).json({ 
          error: `Invalid designation. Allowed: ${adminProfile.department.supportedRoles.join(", ")}` 
        });
      }
    }

    // 3. SUPER_ADMIN Logic
    if (role === 'DEPARTMENT_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: "Only SUPER_ADMIN can create Department Admins" });
    }

    // 4. Duplicate Check (UX ke liye behtar hai)
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { phoneNumber }] }
    });
    if (existingUser) {
        return res.status(400).json({ error: "Email or Phone Number already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // 5. Atomic Create
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        phoneNumber,
        passwordHash,
        role,
        // Role based nested creation
        ...(role === 'STAFF' && { 
            staff: { 
                create: { 
                    departmentId, 
                    designation: designation || "Field Staff" 
                } 
            } 
        }),
        ...(role === 'DEPARTMENT_ADMIN' && { 
            departmentAdmin: { 
                create: { departmentId } 
            } 
        }),
      },
      include: { staff: true, departmentAdmin: true }
    });

    // Sensitive data (passwordHash) automatically exclude ho jayega agar aap return select use karein
    res.status(201).json({ 
      message: `${role} created successfully`,
      user: { id: newUser.id, fullname: newUser.fullname, email: newUser.email, role: newUser.role }
    });

  } catch (error: any) {
    console.error("CREATE_USER_ERROR:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// --- 3. UNIVERSAL LOGIN (For Everyone) ---
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    // Yahan check karein ki user exist karta hai aur password match hota hai
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid credentials" }); // Frontend par error dikhayega
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // FRONTEND SYNC: Yahan 'user' object bhejna zaroori hai
    res.json({ 
      token, 
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
 // controllers/authController.ts
export const getMe = async (req: any, res: any) => {
  try {
    // Console mein check karo ki ID aa rahi hai ya nahi
    console.log("User ID from token:", req.user?.id);

    if (!req.user?.id) {
      return res.status(400).json({ error: "Invalid user data in token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
        departmentAdmin: {
          select: {
            departmentId: true,
            department: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        staff: {
          select: {
            departmentId: true,
            department: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found in database" });
    }

    res.json(user);
  } catch (error: any) {
    console.error("GET_ME_ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};