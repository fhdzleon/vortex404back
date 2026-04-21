export interface PuzzleParams {
  userId: string;
}

export interface SolvePuzzleBody {
  answer: string;
}

export type PuzzleMetadata = {
  wrongMessage?: string;
  hints?: string[];
  explanation?: string;
};
