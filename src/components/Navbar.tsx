import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../services/apiClient';
import AuthContext from '../utils/AuthContext';

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

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
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" gap={2}>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleSignOut}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" component={StyledLink} to="/login">Login</Button>
              <Button color="inherit" component={StyledLink} to="/signup">Signup</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;