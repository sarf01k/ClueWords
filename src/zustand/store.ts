import { ref, get, child } from "firebase/database";
import { realDB } from "@/config/firebase";
import { create } from "zustand";

export const useQuiz = create((set) => ({
  loading: false,
  quiz: [],
  fetchQuiz: async () => {
    set({ loading: true });
    const dbRef = ref(realDB);
    const snapshot = await get(child(dbRef, "quiz"));
    if (snapshot.exists()) {
      set({ quiz: snapshot.val(), loading: false });
    } else {
      set({ quiz: [], loading: false });
    }
  },
  activeQuestion: 0,
  score: 0,

  submitAnswer: (isCorrect: boolean, points: number) =>
    set((s: { score: number; activeQuestion: number }) => ({
      score: isCorrect ? s.score + points : s.score,
      activeQuestion: s.activeQuestion + 1,
    })),
}));
