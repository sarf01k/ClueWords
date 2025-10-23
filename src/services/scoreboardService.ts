import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import type { ScoreboardEntry } from "@/types/models";

const now = new Date(); // current date & time
const startOfWeek = new Date(now);
const endOfWeek = new Date(startOfWeek);
const dayOfWeek = now.getDay(); // day of the week: sunday = 0, monday = 1, ...
const diffToMonday = (dayOfWeek + 6) % 7; // days since Monday
startOfWeek.setDate(now.getDate() - diffToMonday);
startOfWeek.setHours(0, 0, 0, 0); // sets start of week to manday at 00:00

// get the end of the week (sunday 23:59:59)
endOfWeek.setDate(startOfWeek.getDate() + 6);
endOfWeek.setHours(23, 59, 59, 999);

export async function getScoreboard() {
  const snapshot = await getDoc(
    doc(
      db,
      "scoreboard",
      `${startOfWeek.toDateString()} to ${endOfWeek.toDateString()}`
    )
  );

  if (!snapshot.exists()) return [];

  const data = snapshot.data() as { scores: ScoreboardEntry[] };

  return data.scores.sort((a, b) => b.weekCurrentScore - a.weekCurrentScore);
}

export async function addToScoreboard(scoreData: object) {
  const weeklyDocId = `${startOfWeek.toDateString()} to ${endOfWeek.toDateString()}`;
  const scoreRef = doc(db, "scoreboard", weeklyDocId);

  const docSnapshot = await getDoc(scoreRef);

  if (docSnapshot.exists()) {
    await updateDoc(scoreRef, {
      scores: arrayUnion(scoreData),
    });
  } else {
    await setDoc(scoreRef, {
      week: weeklyDocId,
      scores: [scoreData],
    });
  }
}
