import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import { getApplicationsByUserAPI } from '../services/applicationService';
import axiosInstance from '../api/axiosInstance'; // Assuming this has your JWT interceptor

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalApplications: 0, averageMatchScore: 0, topMatchScore: 0, pendingApplications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // Fetch both History and Stats at the same time
        const [historyData, statsResponse] = await Promise.all([
          getMyApplicationsAPI(), // <--- Updated! No ID needed!
          axiosInstance.get('/dashboard/stats') 
        ]);
        
        setHistory(historyData.sort((a, b) => b.applicationId - a.applicationId));
        setStats(statsResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return "success";
    if (score >= 50) return "warning";
    return "error";
  };

  // Helper component for the Stat Cards
  const StatCard = ({ title, value, color }) => (
    <Card elevation={2} sx={{ borderRadius: 2, borderTop: `4px solid ${color}` }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom variant="subtitle2">
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
        My Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* STATS ROW */}
          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="TOTAL APPLICATIONS" value={stats.totalApplications} color="#1976d2" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="AVERAGE MATCH" value={`${stats.averageMatchScore}%`} color="#ff9800" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="TOP SCORE" value={`${stats.topMatchScore}%`} color="#4caf50" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="PENDING REVIEWS" value={stats.pendingApplications} color="#9c27b0" />
            </Grid>
          </Grid>

          {/* HISTORY TABLE */}
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
                      <Typography variant="body1" color="text.secondary">No matches saved yet.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  history.map((row) => (
                    <TableRow key={row.applicationId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ fontWeight: '500' }}>{row.company}</TableCell>
                      <TableCell>{row.jobTitle}</TableCell>
                      <TableCell>{row.resumeFileName}</TableCell>
                      <TableCell align="center">
                        <Chip label={`${row.matchScore}%`} color={getScoreColor(row.matchScore)} variant={row.matchScore >= 80 ? "filled" : "outlined"} sx={{ fontWeight: 'bold', minWidth: '70px' }} />
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={row.status} color="primary" size="small" variant="outlined" />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}