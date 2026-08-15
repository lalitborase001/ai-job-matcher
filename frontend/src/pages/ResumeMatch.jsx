import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent, CircularProgress,
  Alert, Grid, Divider, Grow, Snackbar,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import MatchScore from '../components/match/MatchScore';
import ResumeSelector from '../components/resume/ResumeSelector';
import AiSummary from '../components/matching/AiSummary';
import StrengthsCard from '../components/matching/StrengthsCard';
import MissingSkillsCard from '../components/matching/MissingSkillsCard';
import ImprovementsCard from '../components/matching/ImprovementsCard';
import InterviewQuestionsCard from '../components/matching/InterviewQuestionsCard';
import Loading from '../components/common/Loading';

import { getResumesAPI } from '../services/resumeService';
import { generateMatchAPI } from '../services/matchService';
import { applyForJobAPI } from '../services/applicationService';

const ResumeMatch = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedResumeId = location.state?.preselectedResumeId;

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);

  const [matchResult, setMatchResult] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setIsLoadingResumes(true);
        const data = await getResumesAPI();
        const list = Array.isArray(data) ? data : [];
        setResumes(list);

        if (preselectedResumeId && list.some((r) => r.id === preselectedResumeId)) {
          setSelectedResume(preselectedResumeId);
        }
      } catch (err) {
        console.error('Failed to fetch resumes:', err);
        setError('Failed to load resumes. Please try again.');
      } finally {
        setIsLoadingResumes(false);
      }
    };
    fetchResumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMatch = async () => {
    if (!selectedResume) {
      setError('Please select a resume first.');
      return;
    }

    try {
      setError('');
      setIsMatching(true);
      setMatchResult(null);
      const result = await generateMatchAPI(jobId, selectedResume);
      setMatchResult(result);
    } catch (err) {
      console.error('Match generation failed:', err);
      setError("We couldn't generate the AI match. Please try again.");
    } finally {
      setIsMatching(false);
    }
  };

  const handleSaveMatch = async () => {
    try {
      setIsSaving(true);
      await applyForJobAPI(jobId, selectedResume, matchResult.matchPercentage);
      setSaveSuccess(true);
    } catch (err) {
      console.error('Failed to save match:', err);
      setError('Failed to save the match to your history.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingResumes) return <Loading message="Loading resumes..." />;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/jobs')} sx={{ mb: 3 }}>
        Back to Jobs
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AutoAwesomeIcon color="primary" /> AI Resume Match
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Analyze how well your resume matches this job.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid item xs={12} md={8}>
              <ResumeSelector resumes={resumes} value={selectedResume} onChange={setSelectedResume} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={isMatching ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                onClick={handleMatch}
                disabled={isMatching || !selectedResume}
                sx={{ py: 1.5 }}
              >
                {isMatching ? 'Analyzing...' : 'Generate AI Match'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {matchResult && (
        <Grow in={!!matchResult} timeout={400}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h5" gutterBottom>Match Score</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  <MatchScore score={matchResult.matchPercentage || 0} />
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <AiSummary summary={matchResult.summary} />

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <StrengthsCard strengths={matchResult.strengths} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MissingSkillsCard missingSkills={matchResult.missingSkills} />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <ImprovementsCard improvements={matchResult.improvements} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InterviewQuestionsCard questions={matchResult.interviewQuestions} />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleSaveMatch}
                  disabled={isSaving || saveSuccess}
                >
                  {saveSuccess ? 'Saved to History!' : isSaving ? 'Saving...' : 'Save Match & Apply'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grow>
      )}

      <Snackbar
        open={saveSuccess}
        autoHideDuration={4000}
        onClose={() => setSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Match successfully saved to your Dashboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResumeMatch;