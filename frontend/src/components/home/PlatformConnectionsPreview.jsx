import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, Button } from '@mui/material';

const platforms = [
  { id: 'linkedin', name: 'LinkedIn', color: '#0077b5', status: 'Available' },
  { id: 'indeed', name: 'Indeed', color: '#2164f4', status: 'Available' },
  { id: 'naukri', name: 'Naukri', color: '#0052cc', status: 'Available' },
  { id: 'unstop', name: 'Unstop', color: '#1c4980', status: 'Available' },
  { id: 'wellfound', name: 'Wellfound', color: '#000000', status: 'Coming Soon' },
  { id: 'glassdoor', name: 'Glassdoor', color: '#0caa41', status: 'Planned' }
];

const PlatformConnectionsPreview = () => {
  return (
    <Box id="job-search" sx={{ py: { xs: 10, md: 15 }, bgcolor: '#f8fafc' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            One Search. <span style={{ color: '#6366f1' }}>Multiple Platforms.</span>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
            Connect the platforms you use and discover relevant opportunities from one place. Stop jumping between tabs.
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {platforms.map((p) => (
            <Grid item xs={6} sm={4} md={2} key={p.id}>
              <Card sx={{ height: '100%', textAlign: 'center', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ width: 56, height: 56, mb: 2, bgcolor: p.color, fontWeight: 700, fontSize: '1.5rem' }}>
                    {p.name.charAt(0)}
                  </Avatar>
                  <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>{p.name}</Typography>
                  
                  {p.status === 'Available' ? (
                    <Button variant="outlined" size="small" sx={{ mt: 'auto', borderRadius: 4, py: 0.25 }}>Connect</Button>
                  ) : (
                    <Chip label={p.status} size="small" sx={{ mt: 'auto', fontSize: '0.7rem', fontWeight: 600 }} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PlatformConnectionsPreview;
