import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const floatDelayed = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  const handlePrimaryClick = () => {
    navigate('/resumes');
  };

  const handleSecondaryClick = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ pt: { xs: 15, md: 22 }, pb: { xs: 10, md: 15 }, maxWidth: 1200, mx: 'auto', px: 3 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 900, 
                mb: 3, 
                lineHeight: 1.1,
                fontSize: { xs: '3rem', md: '4rem', lg: '4.5rem' },
                background: 'linear-gradient(90deg, #1e293b 0%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Turn Your Resume Into Your Next Opportunity.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6, maxWidth: 480 }}>
              Let AI understand your skills, discover relevant jobs across multiple platforms, and help you move from application to interview faster.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large" 
                endIcon={<ArrowForwardIcon />}
                onClick={handlePrimaryClick}
                sx={{ 
                  py: 2, 
                  px: 4, 
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
                }}
              >
                Upload Your Resume
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={handleSecondaryClick}
                sx={{ 
                  py: 2, 
                  px: 4, 
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 }
                }}
              >
                See How It Works
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', height: 500, display: { xs: 'none', sm: 'block' } }}>
            {/* Decoration */}
            <Box sx={{ 
              position: 'absolute', top: '10%', right: '5%', 
              width: 300, height: 300, 
              bgcolor: 'primary.light', 
              borderRadius: '50%', 
              filter: 'blur(80px)', 
              opacity: 0.3,
              zIndex: 0
            }} />
            
            {/* Card 1: Resume Analysis */}
            <Card 
              sx={{ 
                position: 'absolute', 
                top: 20, 
                left: 0, 
                width: 280, 
                zIndex: 2,
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)',
                animation: `${float} 6s ease-in-out infinite`,
                borderRadius: 4
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesomeIcon fontSize="small" /> RESUME ANALYSIS
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                  {['Java & Spring Boot', 'React.js', 'REST APIs', 'PostgreSQL'].map(skill => (
                    <Box key={skill} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{skill}</Typography>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </Box>
                  ))}
                </Box>
                
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>PROFILE SCORE</Typography>
                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 800 }}>92/100</Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Card 2: Job Match */}
            <Card 
              sx={{ 
                position: 'absolute', 
                bottom: 20, 
                right: 0, 
                width: 320, 
                zIndex: 3,
                boxShadow: '0 24px 48px rgba(15, 23, 42, 0.12)',
                animation: `${floatDelayed} 8s ease-in-out infinite`,
                borderRadius: 4,
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Senior Java Developer</Typography>
                    <Typography variant="body2" color="text.secondary">Tech Innovations Inc. • Remote</Typography>
                  </Box>
                  <Chip 
                    icon={<AutoAwesomeIcon sx={{ fontSize: '1rem' }} />} 
                    label="96% Match" 
                    color="primary" 
                    sx={{ fontWeight: 800, bgcolor: 'primary.main' }}
                  />
                </Box>

                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                  MATCHED SKILLS
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  {['Java', 'Spring Boot', 'REST APIs', 'SQL'].map(s => (
                    <Chip key={s} label={s} size="small" sx={{ fontWeight: 600, bgcolor: 'primary.50', color: 'primary.main' }} />
                  ))}
                </Box>
                
                <Button variant="contained" fullWidth size="large" sx={{ borderRadius: 2 }}>
                  Apply with AI Assistant
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
