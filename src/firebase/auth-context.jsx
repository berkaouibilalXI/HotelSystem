import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { toast } from "sonner";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUserRole(uid) {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data().role || "guest";
      }

      return "guest";
    } catch (error) {
      console.error("Error getting user role:", error);
      return "guest";
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const role = await getUserRole(userCredential.user.uid);
      setUserRole(role);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      // Check if this is a new user
      const userRef = doc(db, "users", userCredential.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // New user, set default role
        await setDoc(userRef, {
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          role: "guest",
          createdAt: new Date(),
        });
      }

      const role = await getUserRole(userCredential.user.uid);
      setUserRole(role);
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  }

  async function signup(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Create user document
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        email,
        name,
        role: "guest",
        createdAt: new Date(),
      });

      setUserRole("guest");
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }
  
  async function signupWithGoogle(){
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userCredential = result.user;
      const userRef = doc(db, "users", userCredential.uid);
      if (!userRef.exists()) {
        // New user, set default role
        await setDoc(userRef, {
          email: userCredential.email,
          name: userCredential.displayName,
          role: "guest",
          createdAt: new Date(),
          });
        }
        setUserRole("guest");
      } catch (error) {
        toast.error("Error signing up with Google:", error);
        throw error;
      }
  }

  async function logout() {
    try {
      await signOut(auth);
      setUserRole(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const role = await getUserRole(user.uid);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    login,
    loginWithGoogle,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
