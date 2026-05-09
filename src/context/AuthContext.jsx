import React, { createContext, useState, useContext } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (role) => {
    if (role === 'patient') {
      setUser(mockUsers.patient1);
    } else if (role === 'doctor') {
      setUser(mockUsers.doctor1);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
