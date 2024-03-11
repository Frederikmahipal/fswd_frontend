// src/pages/CreateCompany.tsx
import React, { useState } from 'react';
import apiClient from '../services/apiClient';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateCompanyContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  maxWidth: 400,
  margin: '0 auto', 
  backgroundColor: theme.palette.background.default,
 }));
 

interface CompanyFormValues {
 company_name: string;
 company_address: string;
 company_city: string;
 company_country: string;
 company_email: string;
}

const CreateCompany: React.FC = () => {
  const navigate = useNavigate();
 const [formValues, setFormValues] = useState<CompanyFormValues>({
    company_name: '',
    company_address: '',
    company_city: '',
    company_country: '',
    company_email: '',
 });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 try {
     const token = sessionStorage.getItem('token');
     if (!token) {
       throw new Error('No token found in sessionStorage');
     }
 
     const response = await apiClient.post('/companies/create', formValues, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     console.log(response.data);
 } catch (error) {
     console.error('Error creating company:', error);
     if (axios.isAxiosError(error) && error.response) {
       console.error('Server response:', error.response.data);
     } else {
       console.error('Error:', error);
     }
 }
 };

 const handleCancel = () => {
  navigate('/dashboard'); 
};
 
 return (
    <CreateCompanyContainer>
      <Typography variant="h4" gutterBottom>
        Create Company
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Company Name"
          name="company_name"
          value={formValues.company_name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Company Address"
          name="company_address"
          value={formValues.company_address}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Company City"
          name="company_city"
          value={formValues.company_city}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Company Country"
          name="company_country"
          value={formValues.company_country}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Company Email"
          name="company_email"
          type="email"
          value={formValues.company_email}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '10px' }}
        >
          Create Company
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error" 
          onClick={handleCancel} 
          style={{ marginTop: '10px' }}
        >
          Cancel
        </Button>
      </form>
    </CreateCompanyContainer>
 );
};

export default CreateCompany;
