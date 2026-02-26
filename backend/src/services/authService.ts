import { PrismaClient, Role } from '@prisma/client';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

const prisma = new PrismaClient();

export const registerUser = async (userData: any) => {
  // 1. Extra fields (departmentId, designation) ko destructure kiya
  const { email, password, fullname, phoneNumber, role, departmentId, designation } = userData;

  const hashedPassword = await hashPassword(password);

  // Transaction use karna best hai taaki User aur Role-table dono sync rahein
  return await prisma.$transaction(async (tx) => {
    // A. Pehle User table mein entry
    const user = await tx.user.create({
      data: {
        email,
        fullname,
        phoneNumber,
        role,
        passwordHash: hashedPassword,
      },
    });

    // B. Role-wise table entry (Production Logic)
    if (role === 'CITIZEN') {
      await tx.citizen.create({ data: { userId: user.id } });
    } 
    else if (role === 'STAFF') {
      // Yahan designation save hogi Staff table mein
      await tx.staff.create({
        data: {
          userId: user.id,
          departmentId: departmentId, 
          designation: designation || "Field Staff", // Default value agar na mile
        },
      });
    } 
    else if (role === 'DEPARTMENT_ADMIN') {
      await tx.departmentAdmin.create({
        data: {
          userId: user.id,
          departmentId: departmentId,
        },
      });
    }

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  });
};

export const loginUser = async (email: string, pass: string) => {
  const user = await prisma.user.findUnique({ 
    where: { email },
    include: {
        staff: true,            // Login ke waqt staff details laane ke liye
        departmentAdmin: true   // Login ke waqt admin details laane ke liye
    }
  });
  
  if (!user || !(await comparePassword(pass, user.passwordHash))) {
    throw new Error('Invalid credentials');
  }
  
  const token = generateToken({ id: user.id, role: user.role });
  return { user, token };
};