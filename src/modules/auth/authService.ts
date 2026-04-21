import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import type { LoginInput, RegisterInput } from "./auth.types.js";
import { createUser, findUserByEmail } from "./auth.repository.js";
import { AppError } from "../../lib/shared/errors/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (input: RegisterInput) => {
  const passwordHash = await bcrypt.hash(input.password, 10);
  const { password, ...rest } = input;

  const user = await createUser({
    ...rest,
    birthday: new Date(input.birthday),
    passwordHash,
  });

  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
};

export const login = async (input: LoginInput) => {
  const user = await findUserByEmail(input.email);

  const isCorrect = await bcrypt.compare(input.password, user.passwordHash);

  if (!isCorrect) {
    throw new AppError("Credenciales invalidas", 401, "INVALID_CREDENTIALS");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return { token };
};
