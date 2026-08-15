import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, Chip, Divider, CircularProgress } from '@mui/material';
import { getJobByIdAPI } from '../services/jobService';
import { getResumesAPI } from '../services/resumeService';
import { generateMatchAPI } from '../services/matchService';
import MatchScore from '../components/match/MatchScore';
import ResumeSelector from '../components/resume/ResumeSelector';
import EmptyState from '../components/common/EmptyState';
import Loading from '../components/common/Loading';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedResumeId = location.state?.preselectedResumeId;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [matchError, setMatchError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const [jobRes, resumesRes] = await Promise.all([getJobByIdAPI(jobId), getResumesAPI()]);
        setJob(jobRes);
        const resumeList = Array.isArray(resumesRes) ? resumesRes : [];
        setResumes(resumeList);

        if (preselectedResumeId && resumeList.some((r) => r.id === preselectedResumeId)) {
          setSelectedResume(preselectedResumeId);
        }
      } catch (err) {
        console.error('Failed to load job details', err);
        setError("We couldn't load this job.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const handleGenerateMatch = async () => {
    if (!selectedResume) {
      setMatchError('Select a resume first.');
      return;
    }
    try {
      setMatchError('');
      setIsMatching(true);
      const res = await generateMatchAPI(jobId, selectedResume);
      setMatchResult(res);
    } catch (err) {
      console.error('AI match failed', err);
      setMatchError("We couldn't generate a match. Please try again.");
    } finally {
      setIsMatching(false);
    }
  };

  if (loading) return <Loading message="Loading job details..." />;
  if (error) return <EmptyState title="Something went wrong" subtitle={error} actionLabel="Back to Jobs" onAction={() => navigate('/jobs')} />;
  if (!job) return <EmptyState title="Job not found" subtitle="This job may have been removed." actionLabel="Back to Jobs" onAction={() => navigate('/jobs')} />;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{job.title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {job.company}{job.company ? ' • ' : ''}{job.location || 'Remote'}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Job Description</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {job.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 1.5 }}>Requirements</Typography>
              {job.requirements?.length ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {job.requirements.map((r, idx) => (<Chip key={idx} label={r} />))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">No specific requirements listed.</Typography>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 1 }}>Benefits</Typography>
              <Typography variant="body2" color="text.secondary">{job.benefits || 'Not specified'}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Your Resume Match</Typography>

              <ResumeSelector resumes={resumes} value={selectedResume} onChange={(val) => setSelectedResume(val)} />

              {matchError && (
                <Typography variant="caption" color="error.main" sx={{ display: 'block', mt: 1 }}>
                  {matchError}
                </Typography>
              )}

              <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                {isMatching ? (
                  <CircularProgress />
                ) : matchResult ? (
                  <MatchScore score={matchResult.matchPercentage} />
                ) : (
                  <EmptyState title="No preview yet" subtitle="Generate a quick AI match for this job." />
                )}
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleGenerateMatch}
                disabled={!selectedResume || isMatching}
                sx={{ mb: 1 }}
              >
                {isMatching ? 'Analyzing...' : 'Generate AI Match'}
              </Button>
              <Button variant="outlined" fullWidth onClick={() => navigate(`/jobs/${job.id}/match`, { state: { preselectedResumeId: selectedResume } })}>
                Open Full Match Page
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobDetails;