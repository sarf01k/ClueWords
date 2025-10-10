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
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import type { User as AppUser } from "@/types/models";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@/components/retroui/Loader";

type AuthContextType = {
  firebaseUser: FirebaseUser | null;
  appUser: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  githubSignIn: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(
    () => firebaseAuth.currentUser
  );
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        // Load Firestore user profile if exists
        try {
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setAppUser(snap.data() as AppUser);
          } else {
            setAppUser(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setAppUser(null);
        }
      } else {
        setAppUser(null);
      }

      setFirebaseUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    const userCred = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    setFirebaseUser(userCred.user);
  };

  const signUp = async (email: string, password: string, username: string) => {
    const userCred = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const uid = userCred.user.uid;

    const usernameRef = doc(db, "usernames", username);
    const userRef = doc(db, "users", uid);

    const newUser: AppUser = {
      email: userCred.user.email!,
      username,
      currentScore: 0,
      challengesCount: 0,
      playedChallenges: {},
      createdAt: serverTimestamp(),
    };

    try {
      await runTransaction(db, async (transaction) => {
        const usernameDoc = await transaction.get(usernameRef);

        if (usernameDoc.exists()) {
          throw new Error("Username already taken");
        }

        transaction.set(usernameRef, { uid });
        transaction.set(userRef, newUser);
      });

      setAppUser(newUser);
    } catch (error) {
      await userCred.user.delete();
      throw error;
    }
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
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        appUser,
        loading,
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

export function PrivateRoute() {
  const { firebaseUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center">
        <Loader variant="secondary" />
      </div>
    );
  }

  return firebaseUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
}
