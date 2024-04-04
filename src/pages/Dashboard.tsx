import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Box, Typography, Stack } from '@mui/material';
import AuthContext from '../utils/AuthContext';

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

const Dashboard: React.FC = () => {

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
 
  const handleCreateCompany = () => {
    navigate('/create-company');
  };

  return (
    <DashboardContainer>
      <Stack spacing={2} alignItems="center">
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