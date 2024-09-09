import React, { useState } from 'react';
import { Box, Grid, TextField, Button, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

// Styled Box for the Form container
const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  minWidth: '600px',
  width: '50vw',
  padding: '2rem',
  background: '#1e293b',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'Cashier', // Default to 'Cashier'
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (formData.username.trim() === '') {
      newErrors.username = 'Full name is required.';
      valid = false;
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://localhost:5000/admin/add-user',
          formData,
          { withCredentials: true } 
        );
        if (response.status === 200) {
          alert('User added successfully!');
          console.log('User added:', response.data);
        //   setFormData({ username: '', email: '', role: 'Cashier', password: '', confirmPassword: '' });
        }
      } catch (error: any) {
        console.error('Error adding user:', error.response?.data.message || error.message);
        alert('Email is already used. ' );
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#38bdf8', marginBottom: 2 }}>
          Add New User
        </Typography>
        <Grid container spacing={2}>
          {/* Left Section: Personal Information */}
          <Grid item xs={12} md={6}>
            <TextField
              label="User Name"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{ sx: { color: '#fff', '& fieldset': { borderColor: '#38bdf8' } } }}
              InputLabelProps={{ sx: { color: '#94a3b8' } }}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{ sx: { color: '#fff', '& fieldset': { borderColor: '#38bdf8' } } }}
              InputLabelProps={{ sx: { color: '#94a3b8' } }}
            />

            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{ sx: { color: '#fff', '& fieldset': { borderColor: '#38bdf8' } } }}
              InputLabelProps={{ sx: { color: '#94a3b8' } }}
            >
              <MenuItem value="Cashier">Cashier</MenuItem>
              <MenuItem value="Stock Manager">Stock Manager</MenuItem>
            </TextField>
          </Grid>

          {/* Right Section: Login Credentials */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{ sx: { color: '#fff', '& fieldset': { borderColor: '#38bdf8' } } }}
              InputLabelProps={{ sx: { color: '#94a3b8' } }}
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{ sx: { color: '#fff', '& fieldset': { borderColor: '#38bdf8' } } }}
              InputLabelProps={{ sx: { color: '#94a3b8' } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: 2,
                background: '#38bdf8',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  background: '#0ea5e9',
                },
                transition: 'all 0.3s',
              }}
            >
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default AddUser;
