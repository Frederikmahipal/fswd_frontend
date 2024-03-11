// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CreateCompany from './pages/CreateCompany'; 


const App: React.FC = () => {
 return (
    <BrowserRouter>
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
 );
};

export default App;
