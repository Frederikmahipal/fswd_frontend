import React, { useState } from 'react';
import apiClient from '../services/apiClient';
import { useNavigate, Link } from 'react-router-dom';
import { handleLoginResponse } from '../utils/LoginResponse';
import { jwtDecode } from 'jwt-decode';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Typography } from '@mui/material';

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
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/users/login', {
        email,
        password,
      });

      handleLoginResponse(response.data);
      console.log(response.data);

      const decodedToken = jwtDecode(response.data.token);
      console.log(decodedToken);

      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
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
        <Link to="/signup" style={{ marginTop: '10px', color: '#4299e1' }}>
          Don't have an account? Sign up
        </Link>
      </LoginForm>
    </LoginContainer>
 );
};

export default Login;
