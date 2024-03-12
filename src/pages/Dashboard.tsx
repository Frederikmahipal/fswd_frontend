import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { styled } from '@mui/material/styles';
import { Button, Box, Typography, Stack } from '@mui/material';

const DashboardContainer = styled(Box)(({ theme }) => ({
 display: 'flex',
 flexDirection: 'column',
 alignItems: 'center',
 justifyContent: 'center',
 backgroundColor: theme.palette.background.default,
}));

const Dashboard: React.FC = () => {
 const navigate = useNavigate();
 const firstName = sessionStorage.getItem('firstName');
 const userRole = sessionStorage.getItem('userRole');
 const userId = sessionStorage.getItem('userId'); 
 const [company, setCompany] = useState<any>(null);

 useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await apiClient.get(`/users/${userId}/company`);
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    if (userId) {
      fetchCompany();
    }
 }, [userId]);

 const handleSignOut = async () => {
    try {
      await apiClient.post('/users/signout');
      sessionStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
 };

 const handleCreateCompany = () => {
    navigate('/create-company');
 };

 return (
    <DashboardContainer>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" gutterBottom>
          Welcome, {firstName} <br />
          {userRole === 'admin' ? 'Admin' : ''}
          {company && <span>Company: {company.company_name}</span>}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSignOut}>
          Sign Out
        </Button>
        {userRole === 'admin' && (
          <Button variant="contained" color="primary" onClick={handleCreateCompany}>
            Create Company
          </Button>
        )}
      </Stack>
    </DashboardContainer>
 );
};

export default Dashboard;
