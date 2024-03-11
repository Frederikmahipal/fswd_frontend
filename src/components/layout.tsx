//  parent route for your protected routes
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const Layout: React.FC = () => {

 const token = localStorage.getItem('token');
 const isAuthenticated = !!token;

 return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Layout;
