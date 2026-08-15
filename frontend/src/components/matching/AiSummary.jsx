import React from 'react';
import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const AiSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <Box>
      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AutoAwesomeIcon fontSize="small" /> AI Summary
      </Typography>
      <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
        "{summary}"
      </Typography>
    </Box>
  );
};

export default AiSummary;