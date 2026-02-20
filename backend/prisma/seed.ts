import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // 1. Ek Default Password Hash banayein
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  // 2. Super Admin Create Karein
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@civicsarathi.com' },
    update: {},
    create: {
      fullname: 'System Super Admin',
      email: 'superadmin@civicsarathi.com',
      phoneNumber: '9999999999',
      passwordHash: passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log("✅ Super Admin created:", superAdmin.email);

  // 3. Kuch Default Departments banayein
  const waterDept = await prisma.department.upsert({
    where: { name: 'Water Department' },
    update: {},
    create: {
      name: 'Water Department',
      description: 'Handles water leakage and supply issues',
    },
  });

  const electricityDept = await prisma.department.upsert({
    where: { name: 'Electricity Department' },
    update: {},
    create: {
      name: 'Electricity Department',
      description: 'Handles power cuts and street light issues',
    },
  });
  console.log("✅ Departments created: Water & Electricity");

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });