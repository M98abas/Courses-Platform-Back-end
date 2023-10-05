import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.admin.upsert({
    where: { email: "admin@man.com" },
    update: {},
    create: {
      email: "admin@man.com",
      name: "Admin",
      password: "Admin@Man123",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
