import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const RegistrationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const RegistrationForm = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const UserRegistration: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/users/signup', {
        email,
        password,
        firstName,
        lastName,
      });

      console.log(response.data);
      
      navigate('/login');
    } catch (error) {
      console.error('Error creating user:', error);
      
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || 'An unknown error occurred');
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  return (
    <RegistrationContainer>
      <RegistrationForm>
        <Typography variant="h4" gutterBottom>
          Sign Up
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
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '10px' }}
          >
            Register
          </Button>
        </form>
        {/* Display error message */}
        {errorMessage && <div>{errorMessage}</div>}
        <Link to="/login" style={{ marginTop: '10px', color: '#4299e1' }}>
          Already have an account? Log in
        </Link>
      </RegistrationForm>
    </RegistrationContainer>
  );
};

export default UserRegistration;