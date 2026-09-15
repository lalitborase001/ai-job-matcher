import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WorkIcon from '@mui/icons-material/Work';
import HubIcon from '@mui/icons-material/Hub';
import TimelineIcon from '@mui/icons-material/Timeline';

const features = [
  { icon: <AutoAwesomeIcon />, text: 'AI Resume Analysis' },
  { icon: <WorkIcon />, text: 'Smart Job Matching' },
  { icon: <HubIcon />, text: 'Multi-Platform Search' },
  { icon: <TimelineIcon />, text: 'Application Tracking' },
];

const TrustSection = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#f8fafc', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'rgba(15,23,42,0.05)' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1.5, mb: 4 }}>
          One intelligent platform for your entire job search
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {features.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1.5, bgcolor: 'primary.50', borderRadius: '50%' }}>
                  {React.cloneElement(item.icon, { fontSize: 'medium' })}
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TrustSection;
