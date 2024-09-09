import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your auth context

const LogoutButton = () => {
  const { logout } = useAuth(); // Access logout function from the context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
      sx={{
        maxWidth: '200px',
        width: '100%',
        backgroundColor: '#f44336', // Red background color
        color: '#fff',
        '&:hover': {
          backgroundColor: '#d32f2f', // Darker red on hover
        },
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
