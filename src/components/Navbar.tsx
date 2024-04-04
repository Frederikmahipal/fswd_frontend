import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Box, Typography } from '@mui/material';
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

  const { isAuthenticated, setIsAuthenticated, user, setUser, company, setCompany } = authContext;
  const navigate = useNavigate();

  const fetchUserAndCompany = async () => {
    if (isAuthenticated && user) { // Add null check for user
      try {
        const response = await apiClient.get(`/users/user/${user.id}/company`);
        setUser(response.data.user);
        if (response.data.company) {
          setCompany(response.data.company);
        }
      } catch (error) {
        console.error('Error fetching user and company:', error);
      }
    } else {
      setUser(null); // Reset user to null
      setCompany(null); // Reset company to null
    }
  };
  useEffect(() => {
    fetchUserAndCompany();
  }, [isAuthenticated, user]);

  const handleSignOut = async () => {
    try {
      await apiClient.post('/users/signout');
      setIsAuthenticated(false);
      setUser(null);
      setCompany(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user?.firstName} {user?.role === 'admin' ? 'Admin' : ''}
          <br />
          {company && <span>Company: {company.company_name}</span>}
        </Typography>
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