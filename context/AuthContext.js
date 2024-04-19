import React, { useState, createContext } from "react";
import { useContext , useEffect } from "react";
import {
  signOut,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

const Authentication = createContext();
export const useAuth = () => {
  return useContext(Authentication);
};
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPassenger, setIsPassenger] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe(); // Unsubscribe from auth state changes when component unmounts
  }, []);

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };
  return (
    <Authentication.Provider
      value={{
        user,
        isPassenger,
        logout,
        setIsPassenger
      }}>
      {children}
    </Authentication.Provider>
  );
};
