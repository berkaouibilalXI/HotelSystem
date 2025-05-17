import { createContext, useContext, useState, useEffect } from "react";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "./config";
import { db } from "./config";
import { toast } from "sonner";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Reset password function
const resetPassword = async (email) => {
  try {
    const auth = getAuth(app);
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  const fetchUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data().role;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user role from Firestore
          const role = await fetchUserRole(user.uid);
          console.log("User role from Firestore:", role);
          setUser({ ...user, role });
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser(user); // Set user without role if there's an error
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const role = await fetchUserRole(result.user.uid);
      console.log("User signed in with role:", role);
      return { ...result, user: { ...result.user, role } };
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        name,
        email,
        role: "user", // Default role
        createdAt: new Date()
      });
      
      return result;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user document exists, if not create it
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          role: "user", // Default role
          createdAt: new Date()
        });
      }
      
      const role = await fetchUserRole(result.user.uid);
      return { ...result, user: { ...result.user, role } };
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  const setUserRole = async (role) => {
    if (!user) {
      toast.error("No user is logged in");
      return;
    }
    
    try {
      // Update role in Firestore
      await setDoc(doc(db, "users", user.uid), { role }, { merge: true });
      
      // Update local user state
      setUser({ ...user, role });
      
      console.log("User role updated to:", role);
      return true;
    } catch (error) {
      console.error("Error setting user role:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    setUserRole,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
