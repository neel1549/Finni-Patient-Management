import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createNewUser } from "../api/api";

interface CurrentUserContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => Promise<void>;
  token: string;
}
const AuthContext = React.createContext<CurrentUserContextType>(undefined);
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const signup = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = (): Promise<void> => {
    return signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      let token = "";
      if (user) {
        token = await user.getIdToken();
        createNewUser(
          {
            email: user.email,
            uid: user.uid,
          },
          token
        );
      }

      setToken(token);
      setLoading(false);
    });
  });
  const value = { currentUser, signup, login, token, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
