export type { RegisterInput, LoginInput } from "./auth.schema.js";

export interface CreateUserInput {
  email: string;
  username: string;
  city: string;
  birthday: Date;
  passwordHash: string;
  avatar?: string;
}
