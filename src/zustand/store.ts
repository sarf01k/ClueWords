import { ref, get as getFromFirebase, child } from "firebase/database";
import { db, realDB } from "@/config/firebase";
import { create } from "zustand";
import { doc, updateDoc } from "@firebase/firestore";

interface QuizQuestion {
  question: string;
  answer: string;
  image?: string;
}

interface Answer {
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

interface QuizState {
  loading: boolean;
  quiz: QuizQuestion[];
  answers: Answer[];
  activeQuestion: number;
  score: number;
  isCompleted: boolean;
  fetchQuiz: (quizId: string) => Promise<void>;
  submitAnswer: (
    isCorrect: boolean,
    points: number,
    userAnswer: string,
    userId: string
  ) => Promise<void>;
  resetQuiz: () => void;
}

export const useQuiz = create<QuizState>((set, get) => ({
  loading: false,
  quiz: [],
  fetchQuiz: async (quizId: string) => {
    set({ loading: true });
    const dbRef = ref(realDB);
    const snapshot = await getFromFirebase(child(dbRef, "/"));
    if (snapshot.exists()) {
      set({ quiz: snapshot.val()[quizId].quiz, loading: false });
    } else {
      set({ quiz: [], loading: false });
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
    userId: string
  ) => {
    const { quiz, activeQuestion, score, answers } = get();
    const correctAnswer = quiz[activeQuestion].answer;
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
      isCompleted: nextQuestion >= quiz.length,
    });

    if (activeQuestion === quiz.length - 1) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { currentScore: score });
    }
  },

  resetQuiz: () =>
    set({
      quiz: [],
      answers: [],
      activeQuestion: 0,
      score: 0,
      isCompleted: false,
    }),
}));
