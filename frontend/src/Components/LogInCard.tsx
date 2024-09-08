import React, { JSXElementConstructor, useState } from 'react';
import { Grid, TextField, Button, Typography, Link, Box } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';  // Import Axios
import { useNavigate } from 'react-router-dom'; // For redirection after login

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(''); // To store server login error
  const navigate = useNavigate(); // For navigation after successful login

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email.';
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
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
            'http://localhost:5000/auth/login',
            { email, password },
            { withCredentials: true } 
        );
        
        if (response.status === 200) {
            console.log('Login successful:', response.data);
            navigate('/dashboard'); // Redirect to dashboard after successful login
        }
    } catch (error: any) {
        console.error('Error logging in:', error.response.data.message);
        setLoginError(error.response.data.message);
    }
  }
};

  return (
    <Grid
      container
      spacing={isMobile ? 2 : 0}
      direction={isMobile ? 'column' : 'row'}
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1f2937)',
        padding: 4,
      }}
    >
      {/* Left section for web (Company logo and greeting) */}
      <Grid
        item
        xs={6}
        md={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'center',
          alignItems: isMobile ? 'center' : 'flex-start',
          padding: isMobile ? 0 : 5,
        }}
      >
        <CompanyLogo>READ</CompanyLogo>
        {!isMobile && (
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontWeight: '300',
              marginTop: 2,
              animation: 'fadeIn 1s',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            Welcome Back to the monument plaza!
          </Typography>
        )}
      </Grid>

      {/* Right section (Login form) */}
      <Grid
        item
        xs={6}
        md={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#1e293b',
          padding: 4,
          borderRadius: 3,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
          animation: 'slideIn 1s ease',
          '@keyframes slideIn': {
            from: { transform: 'translateY(50px)', opacity: 0 },
            to: { transform: 'translateY(0)', opacity: 1 },
          },
        }}
      >
        {isMobile && (
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontWeight: '300',
              marginBottom: 2,
            }}
          >
            Welcome Back!
          </Typography>
        )}

        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              sx: { color: '#fff', '& fieldset': { borderColor: '#38bdf8' } },
            }}
            InputLabelProps={{ sx: { color: '#94a3b8' } }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              sx: { color: '#fff', '& fieldset': { borderColor: '#38bdf8' } },
            }}
            InputLabelProps={{ sx: { color: '#94a3b8' } }}
          />

          {loginError && (
            <Typography
              sx={{ color: 'red', fontSize: '0.875rem', marginTop: '0.5rem' }}
            >
              {loginError}
            </Typography>
          )}

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
            Login
          </Button>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2,
              color: '#94a3b8',
            }}
          >
            <Link href="#" sx={{ color: '#38bdf8' }}>
              Forgot Password?
            </Link>
            <Link href="#" sx={{ color: '#38bdf8' }}>
              Reset Password
            </Link>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

// Custom styled company logo
const CompanyLogo = styled('div')({
  fontSize: '2rem',
  color: '#38bdf8',
  fontWeight: 'bold',
  textShadow: '0px 0px 8px #38bdf8',
  letterSpacing: '2px',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
});

export default Login;
