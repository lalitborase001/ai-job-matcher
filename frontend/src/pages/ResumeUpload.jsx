import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, CircularProgress, Alert, Grid } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { uploadResumeAPI, getResumesAPI, deleteResumeAPI } from '../services/resumeService';
import PageHeader from '../components/common/PageHeader';
import ResumeCard from '../components/resume/ResumeCard';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resumes, setResumes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setError('');
    setSuccess('');

    if (fileRejections?.length > 0) {
      setError('Only PDF and DOCX files are supported.');
      return;
    }
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const fetchResumes = async () => {
    try {
      setIsFetching(true);
      const data = await getResumesAPI();
      setResumes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch resumes', err);
      setError("We couldn't load your resumes.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      setError('');
      setSuccess('');

      await uploadResumeAPI(file);
      setSuccess('Resume uploaded and processed successfully!');
      setFile(null);
      fetchResumes();
    } catch (err) {
      console.error('Upload error:', err);
      setError("We couldn't upload your resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResumeAPI(id);
      fetchResumes();
    } catch (err) {
      console.error('Failed to delete resume', err);
      setError("We couldn't delete that resume. Please try again.");
    }
  };

  // Matching needs both a resume and a job, so send the user to pick a job
  // with this resume pre-selected rather than a bare page reload to /jobs.
  const handleMatch = (resumeId) => {
    navigate('/jobs', { state: { preselectedResumeId: resumeId } });
  };

  if (isFetching) return <Loading message="Loading resumes..." />;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <PageHeader
        title="My Resumes"
        subtitle="Manage your resumes and use AI to match them with relevant jobs."
      />

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Paper
        {...getRootProps()}
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? 'rgba(99,102,241,0.04)' : 'background.paper',
          border: '2px dashed',
          borderColor: isDragReject ? 'error.main' : isDragActive ? 'primary.main' : 'rgba(15,23,42,0.15)',
          transition: 'all 0.2s ease',
          mb: file ? 2 : 4,
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1.5 }} />

        {isDragActive ? (
          <Typography variant="h6" color="primary">Drop the file here...</Typography>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Drag & drop your resume here
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              or click to browse — PDF or DOCX
            </Typography>
          </>
        )}
      </Paper>

      {file && (
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, bgcolor: 'rgba(99,102,241,0.04)' }}>
          <DescriptionOutlinedIcon color="primary" />
          <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 600 }}>{file.name}</Typography>
          <Button variant="contained" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? <CircularProgress size={20} color="inherit" /> : 'Upload & Parse'}
          </Button>
        </Box>
      )}

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Your Resumes</Typography>

      {resumes.length === 0 ? (
        <EmptyState
          title="No resumes yet"
          subtitle="Upload your resume to start matching with jobs using AI."
          actionLabel="Upload Resume"
          onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      ) : (
        <Grid container spacing={2}>
          {resumes.map((r) => (
            <Grid item xs={12} md={6} lg={4} key={r.id}>
              <ResumeCard resume={r} onMatch={handleMatch} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ResumeUpload;