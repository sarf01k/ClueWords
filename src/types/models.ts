import type { FieldValue } from "firebase/firestore";

export type User = {
  email: string;
  username: string;
  currentScore: number | null;
  lastPlayed: string | null;
  createdAt: FieldValue;
};
