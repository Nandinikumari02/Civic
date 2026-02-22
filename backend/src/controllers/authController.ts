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

// --- 2. CREATE STAFF/ADMIN (Super Admin Only) ---
export const createStaffOrAdmin = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phoneNumber, password, role, departmentId } = req.body;
    

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullname, email, phoneNumber, passwordHash, role,
        // Role wise table entry
        ...(role === 'STAFF' && { staff: { create: { departmentId } } }),
        ...(role === 'DEPARTMENT_ADMIN' && { departmentAdmin: { create: { departmentId } } })
      }
    });

    res.status(201).json({ message: `${role} created successfully` });
  } catch (error) {
    res.status(500).json({ error: "Could not create user" });
  }
};

// --- 3. UNIVERSAL LOGIN (For Everyone) ---
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role, fullname: user.fullname });
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
        role: true
       
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