// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const App: React.FC = () => {
 return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Use PrivateRoute for the dashboard */}
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
