import React from 'react';

interface AuthContextProps {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  company: any;
  setCompany: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;