import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, Divider } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ResumeIntelligencePreview = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8fafc' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
            <Card sx={{ boxShadow: '0 20px 40px rgba(15,23,42,0.08)', border: '1px solid rgba(15,23,42,0.04)' }}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InsightsIcon color="primary" /> AI Profile Extraction
                  </Typography>
                  <Chip icon={<AutoAwesomeIcon />} label="92% Match" color="success" sx={{ fontWeight: 700 }} />
                </Box>

                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1.5 }}>EXPERIENCE</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Senior Software Development</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1.5 }}>TARGET ROLES</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Java Developer, Backend Engineer</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1.5 }}>DETECTED SKILLS</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  {['Java', 'Spring Boot', 'React', 'SQL', 'Git'].map(s => (
                    <Chip key={s} label={s} color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                  ))}
                </Box>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1.5 }}>EXTRACTED KEYWORDS</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['REST API', 'Microservices', 'Backend', 'Full Stack'].map(s => (
                    <Chip key={s} label={s} sx={{ bgcolor: 'rgba(99,102,241,0.1)', color: 'primary.main', fontWeight: 600 }} />
                  ))}
                </Box>

              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
              Your Resume, <br />
              <span style={{ color: '#6366f1' }}>Understood by AI</span>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 4, lineHeight: 1.6 }}>
              We don't just parse text. Our advanced AI comprehends your career trajectory, extracts your core competencies, and identifies the exact roles you are best suited for.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <AutoAwesomeIcon color="primary" /> Get a detailed AI score for your resume
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <AutoAwesomeIcon color="primary" /> Discover missing keywords holding you back
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AutoAwesomeIcon color="primary" /> See exactly how recruiters view your profile
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResumeIntelligencePreview;
