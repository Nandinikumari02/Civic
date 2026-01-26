import { PrismaClient, Role } from '@prisma/client';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

const prisma = new PrismaClient();

export const registerUser = async (userData: any) => {
  const { email, password, fullname, phoneNumber, role } = userData;

  const hashedPassword = await hashPassword(password);

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        fullname,
        phoneNumber,
        role,
        passwordHash: hashedPassword,
      },
    });

    
   

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  });
};

export const loginUser = async (email: string, pass: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(pass, user.passwordHash))) {
    throw new Error('Invalid credentials');
  }
  const token = generateToken({ id: user.id, role: user.role });
  return { user, token };
};