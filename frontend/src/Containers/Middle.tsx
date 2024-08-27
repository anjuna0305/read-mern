import React from 'react';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';

const Middle: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        width: '50vw', 
        marginLeft: '25vw', 
        overflowY: 'auto', 
        marginTop: '64px', 
      }}
      
    >
      <Stack spacing={2} sx={{ height: '100%', overflowY: 'hidden' }}>
        {children}
      </Stack>
    </Box>
  );
};

export default Middle;
