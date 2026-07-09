import { Technician } from "../../generated/prisma/browser";
import { env } from "../env";
import { User } from "../interfaces/typeDefs";
import { db } from "../prisma/db";
import { prisma } from "./prisma";
import { faker } from "@faker-js/faker";

var users: User[];
var technicians: Technician[];
async function cleanDatabase() {
  await Promise.all([
    db.orm.public.User.where({ role: "customer" }).deleteAll(),
    db.orm.public.User.where({ role: "technician" }).deleteAll(),
    db.orm.public.Technician.where({ is_available: true }).deleteAll(),
    db.orm.public.Technician.where({ is_available: false }).deleteAll(),
  ]);
}

async function createUser() {
  let data = Array(10)
    .fill(null)
    .map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      role: Math.random() > 0.5 ? "customer" : "technician",
    }));
  users = (await db.orm.public.User.select(
    "id",
    "email",
    "name",
    "password_hash",
    "role",
  ).createAll(data)) satisfies User[];
}

async function createTechnicianProfile() {
  const createTechnicians = Array(10).fill(null);

  for (let index = 0; index < createTechnicians.length; index++) {
    createTechnicians[index] = {
      bio: faker.lorem.lines(3),
      is_available: Math.random() > 0.5 ? true : false,
      ratingAvg: 0.0,
      user_id: users[index].id!,
    };
  }
  technicians = await db.orm.public.Technician.select(
    "id",
    "user_id",
    "bio",
    "is_available",
    "rating_avg",
  ).createAll(createTechnicians);
}

async function main() {
  const runtime = await db.connect({ url: env.DATABASE_URL! });

  // clean tables
  await cleanDatabase();

  await Promise.all([createUser(), createTechnicianProfile()]);

  await runtime.close();
  console.log(users);
  console.log(technicians);
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
