import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Chip } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const mockJobs = [
  {
    title: 'Java Backend Developer',
    company: 'Tech Solutions Ltd.',
    location: 'Pune, India (Remote)',
    match: 92,
    matchedSkills: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
    missingSkills: ['Docker']
  },
  {
    title: 'Full Stack Engineer',
    company: 'Global Startup Inc.',
    location: 'Bangalore, India',
    match: 89,
    matchedSkills: ['Java', 'React', 'Git'],
    missingSkills: ['AWS', 'Node.js']
  },
  {
    title: 'Software Engineer II',
    company: 'Enterprise Systems',
    location: 'Mumbai, India',
    match: 86,
    matchedSkills: ['Java', 'SQL', 'Spring Boot'],
    missingSkills: ['Kubernetes']
  }
];

const JobMatchingPreview = () => {
  return (
    <Box id="ai-matching" sx={{ py: { xs: 10, md: 15 }, maxWidth: 1200, mx: 'auto', px: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
          Smart <span style={{ color: '#6366f1' }}>Job Matching</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
          See exactly why a job matches your profile. Our AI highlights your strengths and identifies exactly what you need to learn.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {mockJobs.map((job, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-8px)' }
              }}
            >
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, pr: 1 }}>
                    {job.title}
                  </Typography>
                  <Chip 
                    icon={<AutoAwesomeIcon sx={{ fontSize: '1rem' }} />} 
                    label={`${job.match}%`} 
                    color={job.match >= 90 ? "success" : "primary"} 
                    sx={{ fontWeight: 800 }}
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <BusinessIcon fontSize="small" /> {job.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnOutlinedIcon fontSize="small" /> {job.location}
                  </Typography>
                </Box>

                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                  MATCHED SKILLS
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                  {job.matchedSkills.map(s => (
                    <Chip key={s} label={s} size="small" sx={{ bgcolor: 'primary.50', color: 'primary.main', fontWeight: 600 }} />
                  ))}
                </Box>

                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                  MISSING SKILLS
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 3 }}>
                  {job.missingSkills.map(s => (
                    <Chip key={s} label={s} size="small" variant="outlined" color="error" sx={{ fontWeight: 600 }} />
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
                <Button variant="outlined" fullWidth sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}>
                  View Job Match
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobMatchingPreview;
