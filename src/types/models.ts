import type { FieldValue } from "firebase/firestore";

interface PlayedChallenge {
  [challengeId: string]: {
    score: number;
  };
}

export type User = {
  email: string;
  username: string;
  weekCurrentScore: number;
  weekChallengeCount: number;
  overallCurrentScore: number;
  overallChallengeCount: number;
  playedChallenges: PlayedChallenge;
  joinedAt: FieldValue;
};

export type ScoreboardEntry = {
  userId: string;
  username: string;
  score: number;
  weekCurrentScore: number;
  weekChallengeCount: number;
};
