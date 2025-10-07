import { ref, get as getFromFirebase, child } from "firebase/database";
import { realDB } from "@/config/firebase";
import { create } from "zustand";

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
    userAnswer: string
  ) => void;
  resetQuiz: () => void;
}

export const useQuiz = create<QuizState>((set) => ({
  loading: false,
  quiz: [],
  fetchQuiz: async (quizId: string) => {
    set({ loading: true });
    const dbRef = ref(realDB);
    const snapshot = await getFromFirebase(child(dbRef, "/"));
    if (snapshot.exists()) {
      console.log(snapshot.val());

      set({ quiz: snapshot.val()[quizId].quiz, loading: false });
    } else {
      set({ quiz: [], loading: false });
    }
  },
  answers: [],
  activeQuestion: 0,
  score: 0,
  isCompleted: false,

  // submitAnswer: (isCorrect: boolean, points: number) => {

  //   const { activeQuestion, quiz } = get();
  //   const next = activeQuestion + 1;

  //   set((s: { score: number; activeQuestion: number }) => ({
  //     answers: [answers.push(),]
  //     score: isCorrect ? s.score + points : s.score,
  //     activeQuestion: next,
  //     isCompleted: next >= quiz.length,
  //   }));
  // },

  submitAnswer: (isCorrect: boolean, points: number, userAnswer: string) =>
    set((state) => {
      const correctAnswer = state.quiz[state.activeQuestion].answer;
      const nextQuestion = state.activeQuestion + 1;

      return {
        answers: [
          ...state.answers,
          {
            correctAnswer,
            userAnswer: userAnswer ? userAnswer : "[No answer]",
            isCorrect,
          },
        ],
        score: isCorrect ? state.score + points : state.score,
        activeQuestion: nextQuestion,
        isCompleted: nextQuestion >= state.quiz.length,
      };
    }),

  resetQuiz: () =>
    set({
      quiz: [],
      answers: [],
      activeQuestion: 0,
      score: 0,
      isCompleted: false,
    }),
}));
