import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Loading...' }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
    <CircularProgress />
    {message && (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>{message}</Typography>
    )}
  </Box>
);

export default Loading;
