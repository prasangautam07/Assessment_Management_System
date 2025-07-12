import React from 'react'
import { createContext,useContext,useState,useEffect } from 'react'
const AuthContext=createContext();
export const AuthProvider = ({children}) => {
    /* const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
     useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.setItem('user',);
  }, [user]); */
    const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);