import { PrismaClient } from "../../generated/prisma/client";
import {prisma} from "./prisma";

export const pipe = (...fns: Function[]) => (val: any) => fns.reduce((prev, fn) => fn(prev), val);
