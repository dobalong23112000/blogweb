
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, uid } = user;

        setUser({ displayName, email, uid });
      } else {
      }
    });

    return () => {
      unsub();
    };
  }, [navigate]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
