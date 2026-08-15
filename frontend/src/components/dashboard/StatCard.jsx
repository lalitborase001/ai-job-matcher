import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// `color` picks a tint from the theme palette (e.g. 'primary', 'success',
// 'warning', 'secondary') so every stat card's icon chip stays consistent
// with the rest of the SaaS palette instead of one-off hex fills.
const StatCard = ({ icon, label, value, subtitle, color = 'primary', sx }) => (
  <Card sx={{ height: '100%', ...sx }}>
    <CardContent sx={{ p: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.75 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            flexShrink: 0,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: (theme) => `${theme.palette[color]?.main || theme.palette.primary.main}14`,
            color: `${color}.main`,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.25, lineHeight: 1.2 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;