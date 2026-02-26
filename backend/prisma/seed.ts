import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Civic Saarthi Seeding started...");

  // 1. Default Password Hash
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  // 2. Super Admin Create Karein (Government Overlord)
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@civicsarathi.com' },
    update: {},
    create: {
      fullname: 'Central Super Admin',
      email: 'superadmin@civicsarathi.com',
      phoneNumber: '9999999999',
      passwordHash: passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log("✅ Super Admin created:", superAdmin.email);

  // 3. Departments with Civic-Based Professional Roles
  
  // A. Water Supply & Management (Jal Board)
  const waterDept = await prisma.department.upsert({
    where: { name: 'Water Supply' },
    update: { 
      supportedRoles: ['Main-Line Technician', 'Valve Operator', 'Pump House Operator', 'Water Quality Inspector'] 
    },
    create: {
      name: 'Water Supply',
      description: 'City-wide water distribution, pipeline maintenance, and supply management.',
      supportedRoles: ['Main-Line Technician', 'Valve Operator', 'Pump House Operator', 'Water Quality Inspector'],
    },
  });

  // B. Public Lighting (Electricity Department)
  const electricityDept = await prisma.department.upsert({
    where: { name: 'Public Lighting' },
    update: { 
      supportedRoles: ['Street Light Inspector', 'HT Line Maintainer', 'Grid Supervisor', 'Electrical Safety Officer'] 
    },
    create: {
      name: 'Public Lighting',
      description: 'Management of city street lights, high-tension lines, and public power grids.',
      supportedRoles: ['Street Light Inspector', 'HT Line Maintainer', 'Grid Supervisor', 'Electrical Safety Officer'],
    },
  });

  // C. Sanitation & Waste Management (Nagar Nigam Swachhta)
  const sanitationDept = await prisma.department.upsert({
    where: { name: 'Sanitation & Waste' },
    update: { 
      supportedRoles: ['Zonal Sanitary Inspector', 'Drainage Supervisor', 'Vector Control Officer', 'Waste Logistics Lead'] 
    },
    create: {
      name: 'Sanitation & Waste',
      description: 'City cleanliness, sewage drainage, and waste collection management.',
      supportedRoles: ['Zonal Sanitary Inspector', 'Drainage Supervisor', 'Vector Control Officer', 'Waste Logistics Lead'],
    },
  });

  console.log("✅ Government Departments & Specialized Roles created.");

  // 4. Create a Test Department Admin (for Water Supply)
  // Taaki aap turant login karke check kar saken
  const waterAdmin = await prisma.user.upsert({
    where: { email: 'wateradmin@civicsarathi.com' },
    update: {},
    create: {
      fullname: 'Water Dept Head',
      email: 'wateradmin@civicsarathi.com',
      phoneNumber: '8888888888',
      passwordHash: passwordHash,
      role: Role.DEPARTMENT_ADMIN,
      departmentAdmin: {
        create: {
          departmentId: waterDept.id,
        },
      },
    },
  });
  console.log("✅ Test Department Admin created: wateradmin@civicsarathi.com");

  console.log("✨ Civic Saarthi Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });