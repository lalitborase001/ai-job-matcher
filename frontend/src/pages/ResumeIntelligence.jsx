import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Card, CardContent, CircularProgress,
  Alert, Grid, Divider, Chip
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InsightsIcon from '@mui/icons-material/Insights';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import ResumeSelector from '../components/resume/ResumeSelector';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

import { getResumesAPI } from '../services/resumeService';
import { getResumeIntelligence, generateResumeIntelligence } from '../services/aiService';
import MatchScore from '../components/match/MatchScore';

const ResumeIntelligence = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);

  const [profile, setProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setIsLoadingResumes(true);
        const data = await getResumesAPI();
        const list = Array.isArray(data) ? data : [];
        setResumes(list);
        if (list.length > 0) {
          setSelectedResume(list[0].id);
        }
      } catch (err) {
        setError('Failed to load resumes.');
      } finally {
        setIsLoadingResumes(false);
      }
    };
    fetchResumes();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!selectedResume) return;
      try {
        setIsLoadingProfile(true);
        setError('');
        setProfile(null);
        const data = await getResumeIntelligence(selectedResume);
        setProfile(data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // No profile yet, that's fine
          setProfile(null);
        } else {
          setError('Failed to fetch intelligence profile.');
        }
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [selectedResume]);

  const handleGenerate = async () => {
    if (!selectedResume) return;
    try {
      setIsGenerating(true);
      setError('');
      const data = await generateResumeIntelligence(selectedResume);
      setProfile(data);
    } catch (err) {
      setError('Failed to generate intelligence profile.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoadingResumes) return <Loading message="Loading resumes..." />;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
          <InsightsIcon color="primary" fontSize="large" /> Resume Intelligence
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your AI-generated candidate profile and resume insights.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} sx={{ alignItems: 'flex-end' }}>
            <Grid item xs={12} md={8}>
              <ResumeSelector resumes={resumes} value={selectedResume} onChange={setSelectedResume} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                onClick={handleGenerate}
                disabled={isGenerating || !selectedResume}
                sx={{ py: 1.5 }}
              >
                {isGenerating ? 'Analyzing...' : (profile ? 'Regenerate Profile' : 'Generate Profile')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {isLoadingProfile ? (
        <Loading message="Fetching profile..." />
      ) : isGenerating ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
          <CircularProgress size={64} sx={{ mb: 3 }} />
          <Typography variant="h6" color="text.secondary">Extracting skills and keywords using AI...</Typography>
        </Box>
      ) : profile ? (
        <Card sx={{ mb: 4, borderTop: '4px solid', borderColor: 'primary.main' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center', borderRight: { md: '1px solid #eee' } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Resume Score</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <MatchScore score={profile.resumeScore || 0} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Based on industry standards and clarity.
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Experience Level</Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  {profile.experienceLevel || 'Not detected'}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Detected Skills</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                  {profile.skills?.map((s, i) => (
                    <Chip key={i} label={s} color="primary" variant="outlined" />
                  ))}
                  {(!profile.skills || profile.skills.length === 0) && <Typography variant="body2">None detected</Typography>}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Target Roles</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                  {profile.roles?.map((r, i) => (
                    <Chip key={i} label={r} />
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesomeIcon color="primary" fontSize="small" /> Recommended Keywords
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {profile.recommendedKeywords?.map((k, i) => (
                    <Chip key={i} label={k} sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main', fontWeight: 600 }} />
                  ))}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningAmberIcon color="warning" fontSize="small" /> Missing Important Keywords
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.missingKeywords?.map((k, i) => (
                    <Chip key={i} label={k} color="error" variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <EmptyState 
          icon={<InsightsIcon fontSize="inherit" />}
          title="No Intelligence Profile" 
          subtitle="Generate an AI profile to discover your resume's strengths and missing keywords."
        />
      )}
    </Box>
  );
};

export default ResumeIntelligence;
