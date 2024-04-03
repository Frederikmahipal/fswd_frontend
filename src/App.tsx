import React, { useState, useEffect } from 'react';
import AuthContext from './utils/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CreateCompany from './pages/CreateCompany';
import Navbar from './components/Navbar';
import checkAuth from './utils/CheckAuth';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-company" element={<CreateCompany />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;