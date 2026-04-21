import { Router } from "express";
import { puzzleRouter } from "../modules/puzzles/puzzle.routes.js";
import { authRouter } from "../modules/auth/auth.routes.js";

export const appRouter = Router();

appRouter.use("/health", (_req, res) => {
  res.send("ok");
});

appRouter.use("/puzzle", puzzleRouter);
appRouter.use("/auth", authRouter);
