import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const HomeApplicationAssistant = () => {
  return (
    <Box id="features" sx={{ py: { xs: 10, md: 15 }, maxWidth: 1200, mx: 'auto', px: 3 }}>
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={12} md={5}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
            Spend Less Time Applying. <br />
            <span style={{ color: '#6366f1' }}>Spend More Time Preparing.</span>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 4, lineHeight: 1.6 }}>
            The AI Application Assistant prepares a highly customized cover letter, answers to common application questions, and generates potential interview questions based on your exact match profile.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            {['Job Found', 'AI Match Generation', 'Application Ready', 'User Review', 'Apply & Track'].map((step, idx) => (
              <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: idx === 2 ? 'primary.main' : 'primary.50', color: idx === 2 ? 'white' : 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {idx + 1}
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: idx === 2 ? 800 : 600, color: idx === 2 ? 'primary.main' : 'text.primary' }}>
                    {step}
                  </Typography>
                </Box>
                {idx < 4 && <ArrowDownwardIcon sx={{ color: 'text.secondary', opacity: 0.5, my: 0.5, ml: -10 }} fontSize="small" />}
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card sx={{ boxShadow: '0 24px 48px rgba(15,23,42,0.1)', borderRadius: 4, border: '1px solid rgba(15,23,42,0.05)' }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <AutoAwesomeIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>AI Application Assistant</Typography>
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>WHY ARE YOU A GOOD FIT?</Typography>
              <Typography variant="body2" sx={{ mb: 4, p: 2, bgcolor: '#f8fafc', borderRadius: 2, borderLeft: '4px solid #6366f1' }}>
                You have 4 years of solid Java and Spring Boot experience which perfectly aligns with the core requirements. While you lack Docker, your extensive microservices background indicates you can ramp up quickly.
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>GENERATED COVER LETTER</Typography>
              <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 4, position: 'relative' }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                  Dear Hiring Manager,
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  With over 4 years of experience building scalable backend services using Java and Spring Boot...
                </Typography>
                <Button size="small" variant="outlined" sx={{ position: 'absolute', top: 12, right: 12 }}>Copy</Button>
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>INTERVIEW PREP</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>• "How do you handle transaction management in Spring Boot?"</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>• "Explain a time you optimized a slow REST API."</Typography>

              <Button variant="contained" fullWidth size="large" color="success">
                Apply & Track
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeApplicationAssistant;
