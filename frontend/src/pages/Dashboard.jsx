import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  Box,
  CircularProgress
} from '@mui/material';
import { getApplicationsByUserAPI } from '../services/applicationService';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // IMPORTANT: Replace '1' with your actual logged-in user's ID
        const currentUserId = 1; 
        const data = await getApplicationsByUserAPI(currentUserId);
        
        // Sort by newest first (optional)
        const sortedData = data.sort((a, b) => b.applicationId - a.applicationId);
        setHistory(sortedData);
      } catch (error) {
        console.error("Failed to fetch match history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Helper function to color-code the match score badge
  const getScoreColor = (score) => {
    if (score >= 80) return "success";
    if (score >= 50) return "warning";
    return "error";
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
        My Match History
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Company</strong></TableCell>
                <TableCell><strong>Job Title</strong></TableCell>
                <TableCell><strong>Resume Used</strong></TableCell>
                <TableCell align="center"><strong>AI Match Score</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1" color="text.secondary">
                      No matches saved yet. Go analyze a resume to get started!
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                history.map((row) => (
                  <TableRow 
                    key={row.applicationId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#fafafa' } }}
                  >
                    <TableCell sx={{ fontWeight: '500' }}>{row.company}</TableCell>
                    <TableCell>{row.jobTitle}</TableCell>
                    <TableCell>{row.resumeFileName}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${row.matchScore}%`}
                        color={getScoreColor(row.matchScore)}
                        variant={row.matchScore >= 80 ? "filled" : "outlined"}
                        sx={{ fontWeight: 'bold', minWidth: '70px' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={row.status} 
                        color="primary" 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}