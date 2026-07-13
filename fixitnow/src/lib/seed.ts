// import { faker } from "@faker-js/faker";
// import { env } from "../env";
// import { User, Technician, Category, Service } from "../interfaces/typeDefs";
// import { db } from "../prisma/db";
// // import { prisma } from "./prisma";

// let users: User[] = [];
// let technicians: Technician[] = [];
// let categories: Category[] = [];
// let services: Service[] = [];

// async function cleanDatabase() {
//   // Clear tables in reverse dependency order to prevent foreign key constraint issues
//   await db.orm.public.TechnicianService.where({}).deleteAll();
//   await db.orm.public.Review.where({}).deleteAll();
//   await db.orm.public.Payments.where({}).deleteAll();
//   await db.orm.public.Booking.where({}).deleteAll();
//   await db.orm.public.Technician.where({}).deleteAll();
//   await db.orm.public.Service.where({}).deleteAll();
//   await db.orm.public.Category.where({}).deleteAll();
//   await db.orm.public.User.where({}).deleteAll();
// }

// async function createUsers() {
//   const userData = Array(15)
//     .fill(null)
//     .map((_, index) => ({
//       name: faker.person.fullName(),
//       email: faker.internet.email(),
//       password_hash: faker.internet.password(),
//       // Ensure we get a good mix of technicians and customers
//       role: index < 5 ? "technician" : "customer",
//     }));

//   users = (await db.orm.public.User.select(
//     "id",
//     "email",
//     "name",
//     "password_hash",
//     "role"
//   ).createAll(userData)) as User[];
// }

// async function createCategoriesAndServices() {
//   // 1. Seed Categories
//   const categoryData = [
//     { name: "Plumbing", description: "Pipes, leaks, and fixture installations", is_active: true },
//     { name: "Electrical", description: "Wiring, outlets, and electrical maintenance", is_active: true },
//     { name: "HVAC", description: "Heating, ventilation, and air conditioning", is_active: true },
//   ];

//   categories = (await db.orm.public.Category.select(
//     "id",
//     "name",
//     "description",
//     "is_active"
//   ).createAll(categoryData)) as Category[];

//   // 2. Seed Services linked to Categories
//   const serviceData = [
//     { name: "Pipe Leak Repair", description: "Fix leaking or burst pipes", category_id: categories[0].id },
//     { name: "Drain Unclogging", description: "Clear blocked sinks or drains", category_id: categories[0].id },
//     { name: "Switchboard Repair", description: "Inspect and fix electrical switches", category_id: categories[1].id },
//     { name: "AC Servicing", description: "Complete cleaning and gas refill", category_id: categories[2].id },
//   ];

//   services = (await db.orm.public.Service.select(
//     "id",
//     "name",
//     "description",
//     "category_id"
//   ).createAll(serviceData)) as Service[];
// }

// async function createTechnicianProfiles() {
//   // Filter only users created with the technician role
//   const technicianUsers = users.filter((u) => u.role === "technician");

//   const technicianData = technicianUsers.map((techUser) => ({
//     bio: faker.lorem.sentences(2),
//     is_available: faker.datatype.boolean(),
//     ratingAvg: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
//     user_id: techUser.id,
//   }));

//   technicians = (await db.orm.public.Technician.select(
//     "id",
//     "user_id",
//     "bio",
//     "is_available",
//     "ratingAvg"
//   ).createAll(technicianData)) as Technician[];
// }

// async function linkTechniciansToServices() {
//   const relations = [];

//   // Assign 1-2 random services to each technician
//   for (const tech of technicians) {
//     const assignedService = services[Math.floor(Math.random() * services.length)];
//     relations.push({
//       technician_id: tech.id,
//       service_id: assignedService.id,
//     });
//   }

//   await db.orm.public.TechnicianService.select("id").createAll(relations);
// }

// async function main() {
//   const runtime = await db.connect({ url: env.DATABASE_URL! });

//   console.log("🧹 Cleaning old database entries...");
//   await cleanDatabase();

//   console.log("🌱 Seeding Users, Categories, and Services...");
//   await createUsers();
//   await createCategoriesAndServices();

//   console.log("🛠️ Creating Technician Profiles and Links...");
//   await createTechnicianProfiles();
//   await linkTechniciansToServices();

//   console.log("✅ Database successfully seeded!");

//   await runtime.close();
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error("❌ Seeding failed:", e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });