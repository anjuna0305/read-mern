import React from 'react';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';



const Right: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        width: '24vw', 
        height: '100vh', 
        position: 'fixed',
        top: 0,
        right: 0,
        overflowY: 'hidden', 
        marginTop: '60px',
        marginRight: 5,
        marginLeft: 5,
      }}
    >
      <Stack spacing={2}>
        {children}
      </Stack>
    </Box>
  );
};

export default Right;
