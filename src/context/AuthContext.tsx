/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User as FirebaseUser,
  type UserCredential,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { db, firebaseAuth } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User as AppUser } from "@/types/models";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  firebaseUser: FirebaseUser | null;
  appUser: AppUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  githubSignIn: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      setFirebaseUser(user);

      if (user) {
        // Load Firestore user profile if exists
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setAppUser(snap.data() as AppUser);
        } else {
          setAppUser(null);
        }
      } else {
        setAppUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
    navigate("/home");
  };

  const signUp = async (email: string, password: string, username: string) => {
    const userCred = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const newUser: AppUser = {
      id: userCred.user.uid,
      email: userCred.user.email!,
      username,
      currentScore: null,
      lastPlayed: null,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", userCred.user.uid), newUser);
    setAppUser(newUser);
    navigate("/home");
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, provider);
  };

  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(firebaseAuth, provider);
  };

  const signOut = async () => {
    await firebaseAuth.signOut();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        appUser,
        signIn,
        signUp,
        googleSignIn,
        githubSignIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}
