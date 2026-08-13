import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, Button, CircularProgress, Alert, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadResumeAPI, getResumesAPI, deleteResumeAPI } from '../services/resumeService';
import PageHeader from '../components/common/PageHeader';
import ResumeCard from '../components/resume/ResumeCard';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resumes, setResumes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const onDrop = useCallback((acceptedFiles) => {
    setError('');
    setSuccess('');
    
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const fetchResumes = async () => {
    try {
      setIsFetching(true);
      const data = await getResumesAPI();
      setResumes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch resumes', err);
      setError('Unable to load resumes.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchResumes(); }, []);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      await uploadResumeAPI(file);
      setSuccess('Resume uploaded and processed successfully!');
      setFile(null);
      fetchResumes();
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload resume. Ensure your backend is running and accepts this file type.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResumeAPI(id);
      fetchResumes();
    } catch (err) {
      console.error('Failed to delete resume', err);
      setError('Failed to delete resume.');
    }
  };

  if (isFetching) return <Loading message="Loading resumes..." />;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 2, p: { xs: 2, md: 0 } }}>
      <PageHeader title="My Resumes" subtitle="Manage your resumes and use them to generate AI-powered job matches." action={<Button variant="contained">+ Upload Resume</Button>} />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Paper
        {...getRootProps()}
        sx={{
          p: 6,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          border: '2px dashed',
          borderColor: isDragReject ? 'error.main' : (isDragActive ? 'primary.main' : 'grey.400'),
          transition: 'all 0.3s ease',
          mb: 4
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        
        {isDragActive ? (
          <Typography variant="h6" color="primary">Drop the file here...</Typography>
        ) : (
          <>
            <Typography variant="h6">Drag & drop your resume here</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              or click to browse files (Only PDF and DOCX accepted)
            </Typography>
          </>
        )}
      </Paper>

      {file && (
        <Box sx={{ mb: 4 }}>
          <Button variant="contained" onClick={handleUpload} disabled={isLoading} sx={{ py: 1.5 }}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Upload and Parse Resume'}
          </Button>
        </Box>
      )}

      <Typography variant="h6" sx={{ mb: 2 }}>Your Resumes</Typography>

      {resumes.length === 0 ? (
        <EmptyState title="No resumes yet" subtitle="Upload your resume to start matching with jobs using AI." actionLabel="Upload Resume" onAction={() => { /* scroll to upload area */ window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      ) : (
        <Grid container spacing={2}>
          {resumes.map((r) => (
            <Grid item xs={12} md={6} lg={4} key={r.id}>
              <ResumeCard resume={r} onView={() => {}} onDownload={() => {}} onMatch={(id) => window.location.assign(`/jobs`)} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ResumeUpload;