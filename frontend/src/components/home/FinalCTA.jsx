import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from 'react-redux';

const FinalCTA = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box sx={{ py: { xs: 10, md: 15 }, textAlign: 'center', px: 3 }}>
      <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
        Ready to Find Jobs That <br />
        <span style={{ color: '#6366f1' }}>Actually Match You?</span>
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 6, maxWidth: 600, mx: 'auto' }}>
        Upload your resume and let AI turn your skills into personalized opportunities today.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        {isAuthenticated ? (
          <>
            <Button 
              variant="contained" 
              size="large" 
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/resumes')}
              sx={{ py: 2, px: 4, fontSize: '1.1rem', borderRadius: 2 }}
            >
              Upload Your Resume
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{ py: 2, px: 4, fontSize: '1.1rem', borderRadius: 2, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
            >
              Explore Dashboard
            </Button>
          </>
        ) : (
          <Button 
            variant="contained" 
            size="large" 
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/register')}
            sx={{ py: 2, px: 4, fontSize: '1.1rem', borderRadius: 2, boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)' }}
          >
            Get Started for Free
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FinalCTA;
