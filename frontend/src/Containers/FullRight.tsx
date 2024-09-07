import React from 'react';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';



const FullRight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '76vw', 
        height: '100vh', 
        position: 'fixed',
        top: 0,
        right: 0,
        overflowY: 'hidden', 
        marginTop: '60px',
      }}
    >
      <Stack spacing={2}>
        {children}
      </Stack>
    </Box>
  );
};

export default FullRight;
