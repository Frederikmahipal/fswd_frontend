import React, { useContext, useState } from 'react';
import apiClient from '../services/apiClient';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AuthContext from '../utils/AuthContext';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const LoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const LoginForm = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUser, setCompany } = authContext;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await apiClient.post('/users/login', {
        email,
        password,
      });
      
      setIsAuthenticated(true);
      setUser(response.data); 
  
 
      const companyResponse = await apiClient.get(`/users/user/${response.data._id}/company`);
      setCompany(companyResponse.data.company);
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
  
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      } else {
        
        setErrorMessage('Unknown error');
      }
    }
  };
  return (
    <LoginContainer>
      <LoginForm>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '10px' }}
          >
            Login
          </Button>
        </form>
        {errorMessage && <div>{errorMessage}</div>}
        <Link to="/signup" style={{ marginTop: '10px', color: '#4299e1' }}>
          Don't have an account? Sign up
        </Link>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
