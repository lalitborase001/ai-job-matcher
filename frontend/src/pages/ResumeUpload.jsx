import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, Button, CircularProgress, Alert, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { uploadResumeAPI } from '../services/resumeService';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    } catch (err) {
      console.error("Upload error:", err);
      setError('Failed to upload resume. Ensure your backend is running and accepts this file type.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resume Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload your resume in PDF or DOCX format to allow our AI to extract your skills.
      </Typography>

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
          transition: 'all 0.3s ease'
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Selected File:</Typography>
          <List>
            <ListItem sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 1, mt: 1 }}>
              <ListItemIcon>
                <InsertDriveFileIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={file.name} 
                secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`} 
              />
            </ListItem>
          </List>
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpload}
            disabled={isLoading}
            sx={{ mt: 3, py: 1.5 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Upload and Parse Resume'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ResumeUpload;