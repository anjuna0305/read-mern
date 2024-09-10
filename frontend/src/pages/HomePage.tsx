import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #94a3b8, #38bdf8)',
        textAlign: 'center',
        padding: 4,
      }}
    >
      {/* Title */}
      <AnimatedTitle variant="h2" gutterBottom>
        Welcome to GiftCraft Creations
      </AnimatedTitle>

      {/* Subtitle */}
      <Typography variant="h6" sx={{ color: '#555', marginBottom: 4 }}>
        Where Every Gift Tells a Story
      </Typography>

      {/* Description Text */}
      <Typography variant="body1" sx={{ maxWidth: '600px', color: '#333', marginBottom: 6 }}>
        At GiftCraft Creations, we design and manufacture customized gift items for every occasion. 
        From handcrafted gifts to corporate souvenirs, we bring your ideas to life with quality craftsmanship. 
        Whether it's a birthday, wedding, or a corporate event, our unique gifts leave a lasting impression.
      </Typography>

      {/* Login Button */}
      <Button
        onClick={handleLoginRedirect}
        variant="contained"
        color="primary"
        sx={{
          padding: '10px 20px',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '30px',
          textTransform: 'none',
          animation: 'bounce 2s infinite',
          maxWidth: '200px',
          background: '#f8b500',
          color: '#fff',
          '&:hover': {
            background: '#94a3b8',
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

// Animation for Title
const AnimatedTitle = styled(Typography)({
  fontSize: '3rem',
  fontWeight: '700',
  color: '#333',
  textShadow: '0px 0px 8px #f8b500',
  animation: 'fadeIn 2s ease, pulse 2s infinite',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
});

export default HomePage;
