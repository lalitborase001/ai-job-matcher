import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const EmptyState = ({ icon, title, subtitle, actionLabel, onAction }) => (
  <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
    <Box sx={{ fontSize: 48, mb: 2 }}>{icon}</Box>
    <Typography variant="h6" sx={{ mb: 1 }}>{title}</Typography>
    {subtitle && <Typography variant="body2" sx={{ mb: 3 }}>{subtitle}</Typography>}
    {actionLabel && <Button variant="contained" onClick={onAction}>{actionLabel}</Button>}
  </Box>
);

export default EmptyState;
