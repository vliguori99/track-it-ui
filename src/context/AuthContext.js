import { createContext, useContext, useState } from "react";
import { data } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const login = (data) => {
    setAuthData(data);
  };

  const logout = () => {
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// create a "custom hook" in order to use the context with ease
export const useAuth = () => {
  return useContext(AuthContext);
};
