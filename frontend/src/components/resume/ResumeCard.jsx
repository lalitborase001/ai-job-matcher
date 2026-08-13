import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const ResumeCard = ({ resume, onView, onDownload, onMatch, onDelete }) => (
  <Card sx={{ transition: 'transform 400ms ease-in-out, box-shadow 400ms ease-in-out' }}>
    <CardContent>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <InsertDriveFileIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{resume.fileName}</Typography>
          <Typography variant="caption" color="text.secondary">{resume.uploadedAt ? new Date(resume.uploadedAt).toLocaleString() : 'Recently uploaded'}</Typography>
        </Box>
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => onView(resume.id)}>View</Button>
      <Button size="small" onClick={() => onDownload(resume.id)}>Download</Button>
      <Button size="small" variant="contained" onClick={() => onMatch(resume.id)}>AI Match</Button>
      <Button size="small" color="error" onClick={() => onDelete(resume.id)}>Delete</Button>
    </CardActions>
  </Card>
);

export default ResumeCard;
