import type { FieldValue } from "firebase/firestore";

interface PlayedChallenge {
  [challengeId: string]: {
    score: number;
  };
}

export type User = {
  email: string;
  username: string;
  currentScore: number;
  challengesCount: number;
  playedChallenges: PlayedChallenge;
  createdAt: FieldValue;
};
