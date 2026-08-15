import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
      <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 4, bgcolor: 'transparent' }}>
        <Typography variant="h1" sx={{ fontWeight: 800, mb: 1, color: 'primary.main', fontSize: '6rem' }}>404</Typography>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Page not found</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>The page you're looking for doesn't exist or has been moved.</Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </Paper>
    </Box>
  );
};

export default NotFound;