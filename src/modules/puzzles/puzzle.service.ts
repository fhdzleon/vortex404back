import { getPuzzleByUser, updateProgress } from "./puzzle.repository.js";
import type { PuzzleMetadata } from "./puzzle.types.js";
import bcrypt from "bcrypt";

export const getCurrentPuzzle = async (userId: string) => {
  const { puzzle } = await getPuzzleByUser(userId);

  return {
    level: puzzle?.level,
    question: puzzle?.question,
    type: puzzle?.type,
    metadata: (puzzle?.metadata ?? {}) as PuzzleMetadata,
  };
};

export const solvePuzzle = async (userId: string, answer: string) => {
  const { puzzle, level } = await getPuzzleByUser(userId);

  const isCorrect = await bcrypt.compare(answer, puzzle.answerHash);

  if (!isCorrect) {
    const puzzleMetadata = puzzle.metadata as PuzzleMetadata | null;

    return {
      success: false,
      message: puzzleMetadata?.wrongMessage ?? "Incorrecto",
      hint: puzzleMetadata?.hints?.[0] ?? null,
    };
  }
  const nextLevel = level + 1;

  await updateProgress(userId, nextLevel);

  return {
    success: true,
    message: "Correcto!",
    nextLevel,
  };
};
