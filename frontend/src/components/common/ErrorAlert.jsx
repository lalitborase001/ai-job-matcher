import React from 'react';
import { Alert, Box } from '@mui/material';

const ErrorAlert = ({ message, onRetry }) => (
  <Box sx={{ my: 2 }}>
    <Alert severity="error" action={onRetry ? <button onClick={onRetry}>Try Again</button> : null}>
      {message}
    </Alert>
  </Box>
);

export default ErrorAlert;
