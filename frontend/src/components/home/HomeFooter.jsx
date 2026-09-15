import React from 'react';
import { Box, Typography, Grid, Link, Divider } from '@mui/material';
import Logo from '../common/Logo';

const HomeFooter = () => {
  return (
    <Box sx={{ bgcolor: '#0f172a', color: 'white', pt: 10, pb: 4, px: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2, filter: 'brightness(0) invert(1)' }}>
              <Logo showText={true} />
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', mt: 2, lineHeight: 1.6, pr: { md: 4 } }}>
              AI-powered job discovery and application assistance. Turn your resume into your next opportunity.
            </Typography>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>PRODUCT</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>AI Matching</Link>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>Resume Intelligence</Link>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>Jobs</Link>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>Applications</Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>COMPANY</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>About</Link>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>Contact</Link>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>Privacy</Link>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>Terms</Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>SOCIAL</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>GitHub</Link>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>LinkedIn</Link>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>Twitter</Link>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            © {new Date().getFullYear()} AI Resume Matcher. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeFooter;
