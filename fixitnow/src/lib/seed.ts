import { prisma } from "./prisma";


async function main() {
  // clean table
  const deleteUsers = await prisma.user.deleteMany();

  // Create a new user with a post

  const user = await prisma.user.create({
    data: {},
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
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