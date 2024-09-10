import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const NoAccessPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ff6b6b, #f6416c)',
        textAlign: 'center',
        padding: 4,
      }}
    >
      {/* Warning Title */}
      <WarningTitle variant="h1" gutterBottom>
        No Access!
      </WarningTitle>

      {/* Subtitle */}
      <Typography variant="h6" sx={{ color: '#fff', marginBottom: 4 }}>
        You don't have permission to access this page.
      </Typography>

      {/* Go Back Button */}
      <Button
        onClick={handleGoBack}
        variant="contained"
        sx={{
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '30px',
          textTransform: 'none',
          background: '#fff',
          color: '#f6416c',
          maxWidth: '200px',
          '&:hover': {
            background: '#ff6b6b',
            color: '#fff',
          },
        }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

// Custom styled Warning Title with animation
const WarningTitle = styled(Typography)({
  fontSize: '4rem',
  fontWeight: '700',
  color: '#fff',
  textShadow: '0px 0px 12px rgba(0,0,0,0.4)',
  animation: 'pulseWarning 1.5s infinite ease-in-out',
  '@keyframes pulseWarning': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)', color: '#ff9f9f' },
    '100%': { transform: 'scale(1)' },
  },
});

export default NoAccessPage;
