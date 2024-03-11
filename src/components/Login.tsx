// src/components/login.tsx
import React, { useState } from 'react';
import apiClient from '../services/user_service'; 
import { useNavigate, Link } from 'react-router-dom'; 

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

      // Store the token in session storage
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('firstName', response.data.firstName);
      sessionStorage.setItem('lastName', response.data.lastName);

      console.log(response.data);
      
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error logging in:', error);
      // Show error here
    }
 };

 return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <Link to="/signup">Don't have an account? Sign up</Link>
    </div>
 );
};

export default Login;
