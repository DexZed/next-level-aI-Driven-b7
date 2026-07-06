import { prisma } from "./prisma";

async function cleanDatabase() {
  await prisma.user.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.category.deleteMany();
  await prisma.payments.deleteMany();
  await prisma.review.deleteMany();
  await prisma.service.deleteMany();
  await prisma.technician.deleteMany();
  await prisma.technicianService.deleteMany();
}

async function main() {
  // clean tables
  await cleanDatabase();

  await Promise.all([]);
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
