import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Card, CardContent, CircularProgress, 
  Alert, Select, MenuItem, InputLabel, FormControl, Grid, Chip, 
  LinearProgress, Divider, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { getResumesAPI } from '../services/resumeService';
import { generateMatchAPI } from '../services/matchService';
import { applyForJobAPI } from '../services/applicationService';
import { Snackbar } from '@mui/material';

const ResumeMatch = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  
  const [matchResult, setMatchResult] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveMatch = async () => {
    try {
      setIsSaving(true);
      
      const currentUserId = 1; 

      await applyForJobAPI(
        currentUserId, 
        jobId, 
        selectedResume, 
        matchResult.matchPercentage
      );
      
      setSaveSuccess(true);
    } catch (err) {
      console.error("Failed to save match:", err);
      setError("Failed to save the match to your history.");
    } finally {
      setIsSaving(false);
    }
  };

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
      // selectedResume now strictly holds the valid database ID
      const result = await generateMatchAPI(jobId, selectedResume);
      setMatchResult(result);
    } catch (err) {
      console.error("Match generation failed:", err);
      setError('AI Match failed. Check your Spring Boot console for Gemini API errors.');
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
        <Grid container spacing={3} sx={{ alignItems: 'center' }}>
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
                    // Now safely using the 'id' field we just added to the Java backend
                    <MenuItem key={resume.id} value={resume.id}>
                      {resume.fileName}
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

      {/* RENDER THE AI RESPONSE BASED EXACTLY ON AiResponse.java */}
      {matchResult && (
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            
            {/* MATCH PERCENTAGE */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h5" gutterBottom>Match Score</Typography>
              <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
                {matchResult.matchPercentage}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={matchResult.matchPercentage || 0} 
                sx={{ height: 10, borderRadius: 5, mt: 2, mb: 1 }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />
            
            {/* AI SUMMARY */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                AI Summary
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                "{matchResult.summary}"
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* STRENGTHS & MISSING SKILLS */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="success.main" gutterBottom>
                  Strengths
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {matchResult.strengths?.map((strength, index) => (
                    <Chip key={index} label={strength} color="success" variant="outlined" />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="error.main" gutterBottom>
                  Missing Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {matchResult.missingSkills?.map((skill, index) => (
                    <Chip key={index} label={skill} color="error" variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* IMPROVEMENTS & INTERVIEW QUESTIONS */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="warning.main" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <LightbulbIcon sx={{ mr: 1 }} /> Suggested Improvements
                </Typography>
                <List dense>
                  {matchResult.improvements?.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                      <ListItemText primary={`• ${item}`} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="info.main" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <QuestionAnswerIcon sx={{ mr: 1 }} /> Prep Questions
                </Typography>
                <List dense>
                  {matchResult.interviewQuestions?.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                      <ListItemText primary={`• ${item}`} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            {/* Add this right before the closing </CardContent> tag */}
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="success" 
                size="large"
                onClick={handleSaveMatch}
                disabled={isSaving || saveSuccess}
              >
                {saveSuccess ? 'Saved to History!' : (isSaving ? 'Saving...' : 'Save Match & Apply')}
              </Button>
            </Box>     
          </CardContent>
        </Card>
      )}
      {/* Success Popup */}
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