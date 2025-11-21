import { ref, get as getFromFirebase, child } from "firebase/database";
import { realDB } from "@/config/firebase";
import { create } from "zustand";
import type { PlayedChallenges } from "@/types/models";

interface Question {
  question: string;
  answer: string;
  image: string;
}

interface Challenge {
  questions: Question[];
  no: number;
  image?: string;
}

interface Answer {
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

interface ChallengeState {
  loading: boolean;
  challenges: Record<string, Challenge>;
  challenge: Challenge | null;
  answers: Answer[];
  activeQuestion: number;
  score: number;
  isCompleted: boolean;
  fetchChallenges: () => Promise<void>;
  fetchChallenge: (challengeId: string) => Promise<void>;
  submitAnswer: (
    isCorrect: boolean,
    points: number,
    userAnswer: string,
    challengeId: string,
    refreshCache: () => void
  ) => Promise<void>;
  resetQuiz: () => void;
}

export const useChallenges = create<ChallengeState>((set, get) => ({
  loading: false,
  challenges: {},
  challenge: null,
  answers: [],
  activeQuestion: 0,
  score: 0,
  isCompleted: false,

  async fetchChallenges() {
    set({ loading: true });
    const dbRef = ref(realDB);
    const challenges = await getFromFirebase(child(dbRef, "challenge"));
    if (challenges.exists()) {
      set({ challenges: challenges.val(), loading: false });
    } else {
      set({ challenges: {}, loading: false });
    }
  },

  async fetchChallenge(challengeId: string) {
    set({ loading: true });
    const dbRef = ref(realDB);
    const challenge = await getFromFirebase(
      child(dbRef, `challenge/${challengeId}`)
    );
    if (challenge.exists()) {
      set({ challenge: challenge.val(), loading: false });
    } else {
      set({ challenge: null, loading: false });
    }
  },

  submitAnswer: async (
    isCorrect: boolean,
    points: number,
    userAnswer: string,
    challengeId: string,
    refreshCache: () => void
  ) => {
    const { challenge, activeQuestion, score, answers } = get();
    const correctAnswer = challenge!.questions[activeQuestion].answer;
    const nextQuestion = activeQuestion + 1;

    set({
      answers: [
        ...answers,
        {
          correctAnswer,
          userAnswer: userAnswer ? userAnswer : "[No answer]",
          isCorrect,
        },
      ],
      score: isCorrect ? score + points : score,
      activeQuestion: nextQuestion,
      isCompleted: nextQuestion >= challenge!.questions.length,
    });

    if (activeQuestion === challenge!.questions.length - 1) {
      const cacheStr = localStorage.getItem("cache");
      const cache: PlayedChallenges = cacheStr
        ? JSON.parse(cacheStr)
        : { playedChallenges: {} };

      if (!cache.playedChallenges[challengeId]) {
        cache.playedChallenges[challengeId] = { score };

        localStorage.setItem("cache", JSON.stringify(cache));
        refreshCache();
      }
    }
  },

  resetQuiz: () =>
    set({
      challenge: null,
      answers: [],
      activeQuestion: 0,
      score: 0,
      isCompleted: false,
    }),
}));
