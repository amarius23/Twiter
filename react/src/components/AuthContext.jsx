import React, { createContext, useState, useContext, Children } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [username, setUser] = useState(localStorage.getItem('user') || '');
    const [id,setId] = useState(localStorage.getItem('id') || '')
    const updateAuth = (newToken,newUser,newId) => {
      setToken(newToken);
      setUser(newUser)
      setId(newId)  
        if (newToken) {
          localStorage.setItem('token', newToken);
          localStorage.setItem('user', newUser);
          localStorage.setItem('id',newId)
          } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('id')
          }

    }
    return (<AuthContext.Provider value={{ token,username,id, updateAuth }}>
        {children}
    </AuthContext.Provider>);
}
export const useAuth = () => useContext(AuthContext);