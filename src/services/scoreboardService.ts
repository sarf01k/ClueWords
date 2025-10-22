import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

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
  const q = query(
    collection(db, "leaderboard"),
    where("timestamp", ">=", startOfWeek),
    where("timestamp", "<=", endOfWeek),
    orderBy("timestamp"),
    orderBy("score", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}

export async function addToScoreboard(scoreData: object) {
  const weeklyDocId = `${startOfWeek.toDateString()} to ${endOfWeek.toDateString()}`;
  const scoreRef = doc(db, "leaderboard", weeklyDocId);

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
