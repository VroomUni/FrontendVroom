import React, { useState, createContext } from "react";
import { useContext } from "react";

const Authentication = createContext();
export const useAuth = () => {
  return useContext(Authentication);
};
export const AuthContextProvider = ({ children }) => {
const [isAuthenticated , setIsAuthenticated] = useState(false);
const [isPassenger , setIsPassenger ] = useState(true);
  return (
    <Authentication.Provider
      value={{
       
      }}>
      {children}
    </Authentication.Provider>
  );
};
