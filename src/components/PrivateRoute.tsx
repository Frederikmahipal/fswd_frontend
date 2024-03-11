import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
 const token = sessionStorage.getItem('token');

 if (!token) {
    return <Navigate to="/login" replace />;
 }
 //  render the child routes if token
 return <Outlet />;
};

export default PrivateRoute;
