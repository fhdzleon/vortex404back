import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaSqlite } from "prisma-adapter-sqlite";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  adapter: new PrismaSqlite({
    url: process.env.DATABASE_URL!,
  }),
});

async function main() {
  console.log("🌱 Seeding...");

  const puzzles = [
    {
      level: 1,
      type: "text",
      question:
        "Tengo ciudades, pero no casas; tengo montañas, pero no árboles. ¿Qué soy?",
      answer: "mapa",
    },
    {
      level: 2,
      type: "text",
      question: "Hic gradus simplex, quis numerus est?",
      answer: "2",
    },
    {
      level: 3,
      type: "text",
      question:
        "Dos amigos se despiden, uno se va a Japón y otro a Italia. ¿Cómo se llaman los amigos?",
      answer: "por telefono",
    },
  ];

  const mockUser = await prisma.user.upsert({
    where: { email: "mock@test.com" },
    update: {},
    create: {
      email: "mock@test.com",
      username: "skullDev81",
      city: "Mexico",
      birthday: new Date("1990-05-15"),
      passwordHash: await bcrypt.hash("password123", 10),
    },
  });
  console.log(`User mock ready: ${mockUser.id}`);

  await prisma.progress.upsert({
    where: { userId: mockUser.id },
    update: {},
    create: {
      userId: mockUser.id,
      currentLevel: 1,
    },
  });
  console.log("Progress mock ready");

  for (const puzzle of puzzles) {
    const hash = await bcrypt.hash(puzzle.answer, 10);

    await prisma.puzzle.upsert({
      where: { level: puzzle.level },
      update: {
        question: puzzle.question,
        type: puzzle.type,
        answerHash: hash,
      },
      create: {
        level: puzzle.level,
        type: puzzle.type,
        question: puzzle.question,
        answerHash: hash,
      },
    });

    console.log(`Puzzle level ${puzzle.level} ready`);
  }
}

main()
  .then(() => {
    console.log("🌱 Finish seed");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
