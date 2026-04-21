import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaSqlite } from "prisma-adapter-sqlite";

export const prisma = new PrismaClient({
  adapter: new PrismaSqlite({
    url: process.env.DATABASE_URL!,
  }),
});
