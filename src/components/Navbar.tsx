import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import AuthContext from '../utils/AuthContext';

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const { isAuthenticated, setIsAuthenticated } = authContext;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await apiClient.post('/users/signout');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav>
      {isAuthenticated ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;