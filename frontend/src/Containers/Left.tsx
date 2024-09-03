import React from 'react';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';

const Left: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '24vw', // 1/4th of the screen width
        height: '100vh', // Max height is the screen height
        position: 'fixed', // Always on the left of the screen
        top: 0,
        left: 0,
        overflowY: 'hidden',
        marginLeft: 5,
        marginRight: 5,
      }}
    >
      <Stack spacing={2}>
        {children}
      </Stack>
    </Box>
  );
};

export default Left;