/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
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
  deleteDoc,
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
  refreshAppUser: (uid: string) => Promise<void>;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  githubSignIn: () => Promise<UserCredential>;
  updateAccount: (
    oldUsername: string,
    newUsername: string,
    newPassword: string
  ) => Promise<void>;
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
          refreshAppUser(user.uid);
        } catch (error) {
          setAppUser(null);
          throw error;
        }
      } else {
        setAppUser(null);
      }

      setFirebaseUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const refreshAppUser = async (uid: string) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      localStorage.setItem("username", snap.data().username);
      setAppUser(snap.data() as AppUser);
    } else {
      setAppUser(null);
    }
  };

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
      weekCurrentScore: 0,
      weekChallengeCount: 0,
      overallCurrentScore: 0,
      overallChallengeCount: 0,
      playedChallenges: {},
      joinedAt: serverTimestamp(),
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

  const updateAccount = async (
    oldUsername: string,
    newUsername: string,
    newPassword: string
  ) => {
    const userRef = doc(db, "users", firebaseUser!.uid);
    const newUsernameRef = doc(db, "usernames", newUsername);
    const oldUsernameRef = doc(db, "usernames", oldUsername);

    await runTransaction(db, async (transaction) => {
      const newUsernameDoc = await transaction.get(newUsernameRef);

      if (newUsernameDoc.exists()) {
        throw new Error("Username already taken");
      }

      // transaction.delete(oldUsernameRef);
      transaction.set(newUsernameRef, { uid: firebaseUser!.uid });
      transaction.update(userRef, { username: newUsername });
      await deleteDoc(oldUsernameRef);
    });

    localStorage.setItem("username", newUsername);
    const user = await getDoc(userRef);
    setAppUser(user.data() as AppUser);

    if (newPassword) {
      await updatePassword(firebaseUser!, newPassword);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        appUser,
        refreshAppUser,
        loading,
        signIn,
        signUp,
        googleSignIn,
        githubSignIn,
        updateAccount,
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
