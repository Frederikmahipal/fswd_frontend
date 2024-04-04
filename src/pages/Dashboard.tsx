import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { styled } from '@mui/material/styles';
import { Button, Box, Typography, Stack } from '@mui/material';
import checkAuth from '../utils/CheckAuth';

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUserAndCompany = async () => {
      try {
        const user = await checkAuth(setIsAuthenticated);
        console.log('User:', user); 
        if (user) {
          const companyResponse = await apiClient.get(`/users/user/${user.id}/company`);
          setCompany(companyResponse.data.company);
        }
      } catch (error) {
        console.error('Error fetching user and company:', error);
      }
    };
  
    fetchUserAndCompany();
  }, []);
  const handleSignOut = async () => {
    try {
      await apiClient.post('/users/signout');
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
          Welcome, {user?.firstName} <br />
          {user?.role === 'admin' ? 'Admin' : ''}
          {company && <span>Company: {company.company_name}</span>}
        </Typography>
              
        <Button variant="contained" color="primary" onClick={handleSignOut}>
          Sign Out
        </Button>
        {user?.role === 'admin' && (
          <Button variant="contained" color="primary" onClick={handleCreateCompany}>
            Create Company
          </Button>
        )}
      </Stack>
    </DashboardContainer>
  );
};

export default Dashboard;