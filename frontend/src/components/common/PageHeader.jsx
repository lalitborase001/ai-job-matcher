import React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeader = ({ title, subtitle, action }) => (
  <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>{title}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
    </Box>
    {action}
  </Box>
);

export default PageHeader;
