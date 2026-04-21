import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Email inválido"),
  username: z.string().min(3, "Username mínimo 3 caracteres"),
  city: z.string().min(2, "Ciudad inválida"),
  birthday: z.iso.date("Fecha inválida"),
  password: z.string().min(6, "Password mínimo 6 caracteres"),
  avatar: z.url("URL inválida").optional(),
});

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Password requerido"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
