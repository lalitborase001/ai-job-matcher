import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';

const HomeApplicationTracking = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#0f172a', color: 'white', overflow: 'hidden' }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
          Track every opportunity from discovery to offer.
        </Typography>
        <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 400, mb: 6, maxWidth: 600, mx: 'auto' }}>
          Stop managing spreadsheets. Our dashboard automatically tracks your matches, application statuses, and interview schedules.
        </Typography>

        <Card sx={{ bgcolor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.5)', borderRadius: 4 }}>
          <CardContent sx={{ p: 0 }}>
            {/* Fake Dashboard Header */}
            <Box sx={{ display: 'flex', gap: 4, p: 3, borderBottom: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(0,0,0,0.2)' }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>APPLIED</Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'white' }}>12</Typography>
              </Box>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>INTERVIEW</Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#38bdf8' }}>4</Typography>
              </Box>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>REJECTED</Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#f43f5e' }}>3</Typography>
              </Box>
            </Box>

            {/* Fake Dashboard Rows */}
            <Box sx={{ p: 3 }}>
              {[
                { c: 'Tech Solutions Ltd.', j: 'Java Backend Developer', s: 'Interview', sc: 'info' },
                { c: 'Global Startup Inc.', j: 'Full Stack Engineer', s: 'Applied', sc: 'primary' },
                { c: 'Enterprise Systems', j: 'Software Engineer II', s: 'Pending', sc: 'warning' },
              ].map((row, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: 'white' }}>{row.j}</Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>{row.c}</Typography>
                  </Box>
                  <Chip label={row.s} color={row.sc} size="small" sx={{ fontWeight: 600 }} />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default HomeApplicationTracking;
