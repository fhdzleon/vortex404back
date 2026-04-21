import { Router } from "express";
import {
  getPuzzleController,
  solvePuzzleController,
} from "./puzzle.controller.js";
import { authMiddleware } from "../../lib/shared/middlewares/authMiddleware.js";

export const puzzleRouter = Router();

/**
 * @openapi
 * /puzzle:
 *   get:
 *     summary: Obtener el puzzle actual del usuario
 *     tags:
 *       - Puzzle
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Puzzle actual
 *       401:
 *         description: Token inválido o requerido
 *       404:
 *         description: Puzzle no encontrado
 */

puzzleRouter.get("/", authMiddleware, getPuzzleController);

/**
 * @openapi
 * /puzzle/solve:
 *   post:
 *     summary: Enviar respuesta al puzzle actual
 *     tags:
 *       - Puzzle
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answer
 *             properties:
 *               answer:
 *                 type: string
 *                 example: 'mapa'
 *     responses:
 *       200:
 *         description: Respuesta evaluada
 *       400:
 *         description: Answer requerido
 *       401:
 *         description: Token inválido o requerido
 */
puzzleRouter.post("/solve", authMiddleware, solvePuzzleController);
