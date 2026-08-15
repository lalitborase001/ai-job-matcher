import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent, CircularProgress,
  Alert, Grid, Divider, Grow, Snackbar, FormControl, InputLabel, Select, MenuItem, TextField
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

import ResumeSelector from '../components/resume/ResumeSelector';
import InterviewQuestionsCard from '../components/matching/InterviewQuestionsCard';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

import { getResumesAPI } from '../services/resumeService';
import { generateMatchAPI } from '../services/matchService';
import { applyForJobAPI } from '../services/applicationService';
import { getJobsAPI } from '../services/jobService';

const ApplicationAssistant = () => {
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

  const [copied, setCopied] = useState(false);

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
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoadingResumes(false);
        if (!paramJobId) setIsLoadingJobs(false);
      }
    };
    fetchData();
  }, [paramJobId]);

  const handleGenerate = async () => {
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
      setError("We couldn't generate the Application Assistant data. Please try again.");
    } finally {
      setIsMatching(false);
    }
  };

  const handleCopyCoverLetter = () => {
    if (matchResult?.coverLetter) {
      navigator.clipboard.writeText(matchResult.coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApply = async () => {
    try {
      setIsSaving(true);
      await applyForJobAPI(selectedJobId, selectedResume, matchResult.matchPercentage);
      setSaveSuccess(true);
      setTimeout(() => navigate('/applications'), 1500);
    } catch (err) {
      setError('Failed to save application to your history.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingResumes || isLoadingJobs) return <Loading message="Loading data..." />;

  const isStandalone = !paramJobId;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 3 } }}>
      {!isStandalone && (
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
          Back
        </Button>
      )}

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
          <AutoAwesomeIcon color="primary" fontSize="large" /> Application Assistant
        </Typography>
        <Typography variant="h6" color="text.secondary">
          AI prepares your application: Cover Letter, Pitch, and Interview Prep.
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
                onClick={handleGenerate}
                disabled={isMatching || !selectedResume || !selectedJobId}
                sx={{ py: 1.5 }}
              >
                {isMatching ? 'Preparing...' : 'Prepare Application'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {!matchResult && !isMatching && (
        <EmptyState 
          icon={<AutoAwesomeIcon fontSize="inherit" />}
          title="Ready to Prepare" 
          subtitle="Select a resume and a job, then click Prepare Application."
        />
      )}

      {isMatching && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
          <CircularProgress size={64} sx={{ mb: 3 }} />
          <Typography variant="h6" color="text.secondary">Generating your personalized cover letter and pitch...</Typography>
        </Box>
      )}

      {matchResult && !isMatching && (
        <Grow in={!!matchResult} timeout={400}>
          <Box>
            <Card sx={{ mb: 4, borderTop: '4px solid', borderColor: 'primary.main' }}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Why are you a good fit?</Typography>
                <Typography variant="body1" sx={{ mb: 4, whiteSpace: 'pre-line' }}>
                  {matchResult.summary}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Cover Letter</Typography>
                  <Button 
                    startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />} 
                    variant="outlined"
                    onClick={handleCopyCoverLetter}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  minRows={8}
                  variant="outlined"
                  value={matchResult.coverLetter || 'AI did not generate a cover letter. Try again.'}
                  sx={{ mb: 4 }}
                />

                <Divider sx={{ my: 4 }} />

                <InterviewQuestionsCard questions={matchResult.interviewQuestions} />

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleApply}
                    disabled={isSaving || saveSuccess}
                    sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
                  >
                    {saveSuccess ? 'Application Tracked!' : isSaving ? 'Tracking...' : 'Apply & Track'}
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
          Application successfully tracked on your Dashboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApplicationAssistant;
