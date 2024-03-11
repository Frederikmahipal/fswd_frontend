import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import apiClient from '../services/user_service'; // Adjust the path as necessary

const Dashboard: React.FC = () => {
 const navigate = useNavigate();
 const firstName = sessionStorage.getItem('firstName');

 const handleSignOut = async () => {
    try {
      await apiClient.post('/users/signout');

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('firstName');
      sessionStorage.removeItem('lastName');
     
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
     
    }
 };

 return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
 );
};

export default Dashboard;
