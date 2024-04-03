import React from 'react';

interface AuthContextProps {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;