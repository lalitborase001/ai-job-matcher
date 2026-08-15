import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent, CircularProgress,
  Alert, Grid, Divider, Grow, Snackbar, FormControl, InputLabel, Select, MenuItem
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
import EmptyState from '../components/common/EmptyState';

import { getResumesAPI } from '../services/resumeService';
import { generateMatchAPI } from '../services/matchService';
import { applyForJobAPI } from '../services/applicationService';
import { getJobsAPI } from '../services/jobService';

const ResumeMatch = () => {
  const { jobId: paramJobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedResumeId = location.state?.preselectedResumeId;

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);

  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(paramJobId || '');
  const [isLoadingJobs, setIsLoadingJobs] = useState(!paramJobId);

  const [matchResult, setMatchResult] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingResumes(true);
        if (!paramJobId) setIsLoadingJobs(true);

        const [resumesData, jobsData] = await Promise.all([
          getResumesAPI(),
          !paramJobId ? getJobsAPI() : Promise.resolve(null)
        ]);

        const list = Array.isArray(resumesData) ? resumesData : [];
        setResumes(list);

        if (preselectedResumeId && list.some((r) => r.id === preselectedResumeId)) {
          setSelectedResume(preselectedResumeId);
        }

        if (jobsData) {
          setJobs(Array.isArray(jobsData) ? jobsData : []);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoadingResumes(false);
        if (!paramJobId) setIsLoadingJobs(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramJobId]);

  const handleMatch = async () => {
    if (!selectedResume || !selectedJobId) {
      setError('Please select both a resume and a job first.');
      return;
    }

    try {
      setError('');
      setIsMatching(true);
      setMatchResult(null);
      const result = await generateMatchAPI(selectedJobId, selectedResume);
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
      await applyForJobAPI(selectedJobId, selectedResume, matchResult.matchPercentage);
      setSaveSuccess(true);
    } catch (err) {
      console.error('Failed to save match:', err);
      setError('Failed to save the match to your history.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingResumes || isLoadingJobs) return <Loading message="Loading data..." />;

  const isStandalone = !paramJobId;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 3 } }}>
      {!isStandalone && (
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/jobs')} sx={{ mb: 3 }}>
          Back to Jobs
        </Button>
      )}

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
          <AutoAwesomeIcon color="primary" fontSize="large" /> AI Resume Match
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Analyze how well your resume matches this job and get personalized recommendations.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} sx={{ alignItems: 'flex-end' }}>
            {isStandalone && (
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="job-select-label">Select Job</InputLabel>
                  <Select
                    labelId="job-select-label"
                    value={selectedJobId}
                    label="Select Job"
                    onChange={(e) => setSelectedJobId(e.target.value)}
                  >
                    {jobs.length === 0 ? (
                      <MenuItem disabled value="">No jobs available</MenuItem>
                    ) : (
                      jobs.map((job) => (
                        <MenuItem key={job.id} value={job.id}>
                          {job.title} - {job.company}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} md={isStandalone ? 4 : 8}>
              <ResumeSelector resumes={resumes} value={selectedResume} onChange={setSelectedResume} />
            </Grid>

            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={isMatching ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                onClick={handleMatch}
                disabled={isMatching || !selectedResume || !selectedJobId}
                sx={{ py: 1.5 }}
              >
                {isMatching ? 'Analyzing...' : 'Generate AI Match'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {!matchResult && !isMatching && (
        <EmptyState 
          icon={<AutoAwesomeIcon fontSize="inherit" />}
          title="Ready for Analysis" 
          subtitle="Select a resume and a job, then click Generate AI Match to receive a detailed breakdown of your fit."
        />
      )}

      {isMatching && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
          <CircularProgress size={64} sx={{ mb: 3 }} />
          <Typography variant="h6" color="text.secondary">Analyzing your resume against the job description...</Typography>
        </Box>
      )}

      {matchResult && !isMatching && (
        <Grow in={!!matchResult} timeout={400}>
          <Box>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Match Score</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <MatchScore score={matchResult.matchPercentage || 0} />
                  </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <AiSummary summary={matchResult.summary} />

                <Divider sx={{ my: 4 }} />

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <StrengthsCard strengths={matchResult.strengths} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MissingSkillsCard missingSkills={matchResult.missingSkills} />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <ImprovementsCard improvements={matchResult.improvements} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InterviewQuestionsCard questions={matchResult.interviewQuestions} />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleSaveMatch}
                    disabled={isSaving || saveSuccess}
                    sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
                  >
                    {saveSuccess ? 'Saved to History!' : isSaving ? 'Saving...' : 'Save Match & Apply'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
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