import React from 'react';
import { Fade, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <Fade in key={location.pathname} timeout={400} appear>
      <Box sx={{ width: '100%' }}>
        {children}
      </Box>
    </Fade>
  );
};

export default PageTransition;
