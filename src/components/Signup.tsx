// src/components/UserRegistration.tsx
import React, { useState } from 'react';
import apiClient from '../services/user_service'; 
import { Link } from 'react-router-dom'; 

const UserRegistration: React.FC = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');

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
      
    } catch (error) {
      console.error('Error creating user:', error);
      
    }
 };

 return (
    <div>
      <h1>Sign Up</h1>
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
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account? Log in</Link>
    </div>
 );
};

export default UserRegistration;
