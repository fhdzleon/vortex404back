import { Router } from "express";
import { loginController, registerController } from "./auth.controller.js";

export const authRouter = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - city
 *               - birthday
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               username:
 *                 type: string
 *                 example: skullDev
 *               city:
 *                 type: string
 *                 example: CDMX
 *               birthday:
 *                 type: string
 *                 example: '1990-05-15'
 *               password:
 *                 type: string
 *                 example: password123
 *               avatar:
 *                 type: string
 *                 example: 'https://avatar.com/img.png'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       409:
 *         description: Email o username ya registrado
 *       400:
 *         description: Campos inválidos
 */

authRouter.post("/register", registerController);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso, retorna JWT
 *       401:
 *         description: Credenciales inválidas
 */
authRouter.post("/login", loginController);
