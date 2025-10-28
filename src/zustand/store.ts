import { ref, get as getFromFirebase, child } from "firebase/database";
import { db, realDB } from "@/config/firebase";
import { create } from "zustand";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { addToScoreboard } from "@/services/scoreboardService";

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
    userId: string,
    quizId: string,
    refreshAppUser: (uid: string) => Promise<void>
  ) => Promise<void>;
  resetQuiz: () => void;
}

export const useChallenges = create<ChallengeState>((set, get) => ({
  loading: false,
  challenges: {},
  challenge: null,

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

  answers: [],
  activeQuestion: 0,
  score: 0,
  isCompleted: false,

  submitAnswer: async (
    isCorrect: boolean,
    points: number,
    userAnswer: string,
    userId: string,
    challengeId: string,
    refreshAppUser: (uid: string) => Promise<void>
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
      const userRef = doc(db, "users", userId);
      const user = await getDoc(userRef);

      if (!user.data()?.playedChallenges?.[challengeId]) {
        await updateDoc(userRef, {
          [`playedChallenges.${challengeId}`]: {
            score,
          },
          weekCurrentScore: user.data()!.weekCurrentScore + score,
          weekChallengeCount: user.data()!.weekChallengeCount + 1,
          overallCurrentScore: user.data()!.overallCurrentScore + score,
          overallChallengeCount: user.data()!.overallChallengeCount + 1,
        });

        const scoreData = {
          userId,
          username: localStorage.getItem("username"),
          score,
          weekCurrentScore: user.data()!.weekCurrentScore + score,
          weekChallengeCount: user.data()!.weekChallengeCount + 1,
        };

        await addToScoreboard(scoreData);

        await refreshAppUser(userId);
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
