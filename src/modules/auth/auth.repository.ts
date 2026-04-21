import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../lib/shared/errors/AppError.js";
import type { CreateUserInput } from "./auth.types.js";

export const createUser = async (input: CreateUserInput) => {
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email: input.email }, { username: input.username }],
    },
  });

  if (existing) {
    const field =
      existing.email === input.email
        ? "EMAIL_ALREADY_EXISTS"
        : "USERNAME_ALREADY_EXISTS";
    const message =
      existing.email === input.email
        ? "El email ya está registrado"
        : "El username ya está en uso";
    throw new AppError(message, 409, field);
  }

  return prisma.user.create({
    data: {
      ...input,
      progress: {
        create: { currentLevel: 1 },
      },
    },
  });
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError("Credenciales invalidas", 401, "INVALID_CREDENTIALS");
  }

  return user;
};
