import React from 'react';
import { Box } from '@mui/material';
import HomeNavbar from '../components/home/HomeNavbar';
import HeroSection from '../components/home/HeroSection';
import TrustSection from '../components/home/TrustSection';
import HowItWorks from '../components/home/HowItWorks';
import ResumeIntelligencePreview from '../components/home/ResumeIntelligencePreview';
import JobMatchingPreview from '../components/home/JobMatchingPreview';
import PlatformConnectionsPreview from '../components/home/PlatformConnectionsPreview';
import HomeApplicationAssistant from '../components/home/HomeApplicationAssistant';
import HomeApplicationTracking from '../components/home/HomeApplicationTracking';
import FinalCTA from '../components/home/FinalCTA';
import HomeFooter from '../components/home/HomeFooter';

const Home = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HomeNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection />
        <TrustSection />
        <HowItWorks />
        <ResumeIntelligencePreview />
        <JobMatchingPreview />
        <PlatformConnectionsPreview />
        <HomeApplicationAssistant />
        <HomeApplicationTracking />
        <FinalCTA />
      </Box>
      <HomeFooter />
    </Box>
  );
};

export default Home;
