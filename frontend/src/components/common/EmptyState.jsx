import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const EmptyState = ({ icon, title, subtitle, actionLabel, onAction }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: { xs: 8, md: 12 }, px: 3, color: 'text.secondary', bgcolor: 'background.paper', borderRadius: 4, border: '1px dashed rgba(15,23,42,0.1)' }}>
    {icon && <Box sx={{ fontSize: 64, mb: 3, opacity: 0.8, color: 'primary.main' }}>{icon}</Box>}
    <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 700, color: 'text.primary' }}>{title}</Typography>
    {subtitle && <Typography variant="body1" sx={{ mb: 4, maxWidth: 480, color: 'text.secondary' }}>{subtitle}</Typography>}
    {actionLabel && <Button variant="contained" size="large" sx={{ px: 4 }} onClick={onAction}>{actionLabel}</Button>}
  </Box>
);

export default EmptyState;
