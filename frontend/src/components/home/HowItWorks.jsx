import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const steps = [
  {
    number: '01',
    title: 'Upload Resume',
    desc: 'Upload your resume and let AI understand your professional profile.',
    color: '#3b82f6'
  },
  {
    number: '02',
    title: 'AI Extracts Your Skills',
    desc: 'Automatically identify skills, technologies, experience, roles and important keywords.',
    color: '#6366f1'
  },
  {
    number: '03',
    title: 'Discover Matching Jobs',
    desc: 'Find relevant opportunities across your connected job platforms instantly.',
    color: '#8b5cf6'
  },
  {
    number: '04',
    title: 'Apply Smarter',
    desc: 'Review match scores, prioritize opportunities and streamline your applications.',
    color: '#d946ef'
  }
];

const HowItWorks = () => {
  return (
    <Box id="how-it-works" sx={{ py: { xs: 10, md: 15 }, maxWidth: 1200, mx: 'auto', px: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
          From Resume to Application in <span style={{ color: '#6366f1' }}>Four Simple Steps</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
          Stop searching blindly. Start matching intelligently. Our AI workflow handles the heavy lifting so you can focus on interviewing.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', position: 'relative', overflow: 'visible', pt: 3 }}>
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: -24, 
                  left: 24, 
                  width: 48, 
                  height: 48, 
                  bgcolor: step.color,
                  color: 'white',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  boxShadow: `0 8px 16px ${step.color}40`
                }}
              >
                {step.number}
              </Box>
              <CardContent sx={{ pt: 3, px: 3, pb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {step.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
