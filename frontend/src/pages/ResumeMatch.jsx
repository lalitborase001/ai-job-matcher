import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Card, CardContent, CircularProgress, 
  Alert, Select, MenuItem, InputLabel, FormControl, Grid, Chip, 
  LinearProgress, Divider 
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getResumesAPI } from '../services/resumeService';
import { generateMatchAPI } from '../services/matchService';

const ResumeMatch = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  
  const [matchResult, setMatchResult] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setIsLoadingResumes(true);
        const data = await getResumesAPI();
        setResumes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
        setError('Failed to load resumes. Please try again.');
      } finally {
        setIsLoadingResumes(false);
      }
    };
    fetchResumes();
  }, []);

  const handleMatch = async () => {
    if (!selectedResume) {
      setError('Please select a resume first.');
      return;
    }

    try {
      setError('');
      setIsMatching(true);
      const result = await generateMatchAPI(jobId, selectedResume);
      setMatchResult(result);
    } catch (err) {
      console.error("Match generation failed:", err);
      setError('AI Match failed. Check if the backend AI module is configured correctly.');
    } finally {
      setIsMatching(false);
    }
  };

  if (isLoadingResumes) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/jobs')}
        sx={{ mb: 3 }}
      >
        Back to Jobs
      </Button>

      <Typography variant="h4" gutterBottom>
        AI Resume Matcher
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Select a resume to compare against this job description. Our Gemini AI will extract skills and calculate your fit.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Card sx={{ mb: 4, p: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <InputLabel id="resume-select-label">Select Resume</InputLabel>
              <Select
                labelId="resume-select-label"
                value={selectedResume}
                label="Select Resume"
                onChange={(e) => setSelectedResume(e.target.value)}
              >
                {resumes.length === 0 ? (
                  <MenuItem disabled value="">No resumes found. Upload one first!</MenuItem>
                ) : (
                  resumes.map((resume) => (
                    <MenuItem key={resume.id} value={resume.id}>
                      {resume.fileName || `Resume ID: ${resume.id}`}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={isMatching ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
              onClick={handleMatch}
              disabled={isMatching || !selectedResume}
              sx={{ py: 1.5 }}
            >
              {isMatching ? 'AI Analyzing...' : 'Generate Match'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {matchResult && (
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h5" gutterBottom>Match Score</Typography>
              <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
                {matchResult.matchPercentage}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={matchResult.matchPercentage} 
                sx={{ height: 10, borderRadius: 5, mt: 2, mb: 1 }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="success.main" gutterBottom>
                  Matching Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {matchResult.matchingSkills?.map((skill, index) => (
                    <Chip key={index} label={skill} color="success" variant="outlined" />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="error.main" gutterBottom>
                  Missing Skills (Gap)
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {matchResult.missingSkills?.map((skill, index) => (
                    <Chip key={index} label={skill} color="error" variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                AI Recommendations
              </Typography>
              <Typography variant="body1">
                {matchResult.aiSuggestions}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ResumeMatch;