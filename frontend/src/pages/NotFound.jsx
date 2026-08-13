import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>404</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>Page not found</Typography>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>Go Back to Dashboard</Button>
      </Paper>
    </Box>
  );
};

export default NotFound;