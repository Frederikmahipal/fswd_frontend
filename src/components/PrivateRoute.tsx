import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';

const PrivateRoute: React.FC = () => {
   const authContext = useContext(AuthContext);

   if (!authContext) {
     throw new Error('AuthContext is undefined');
   }
   
   const { isAuthenticated } = authContext;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;