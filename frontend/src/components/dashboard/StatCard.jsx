import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatCard = ({ icon, label, value, subtitle, sx }) => (
  <Card sx={{ p: 2, ...sx }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}>
          {icon}
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
          {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;
