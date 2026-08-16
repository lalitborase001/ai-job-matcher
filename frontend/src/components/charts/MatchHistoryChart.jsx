import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function MatchHistoryChart({ data }) {
  // If no data is available yet, don't render the chart
  if (!data || data.length === 0) return null;

  // Format data for the chart: 
  // Reverse it so the oldest applications are on the left and newest on the right.
  const chartData = [...data].reverse().map(item => {
    // SAFEGUARDS: Fallback to 'Unknown' if the database returns null
    const companyName = item.company || 'Unknown';
    const jobRole = item.jobTitle || 'Role';
    
    return {
      name: companyName.length > 10 ? companyName.substring(0, 10) + '...' : companyName,
      fullName: companyName,
      score: item.matchScore || 0,
      role: jobRole
    };
  });

  // A custom HTML tooltip that matches your SaaS theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ 
          bgcolor: 'background.paper', 
          p: 2, 
          border: '1px solid #e0e0e0', 
          borderRadius: 2, 
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {payload[0].payload.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {payload[0].payload.role}
          </Typography>
          <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Score: {payload[0].value}%
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 2, mb: 4, borderTop: '4px solid #1976d2' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
          AI Match Score Trend
        </Typography>
        
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              
              {/* The magical gradient that makes it look like a SaaS app */}
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1976d2" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                </linearGradient>
              </defs>

              {/* Minimalist grid lines (horizontal only) */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
              
              <Tooltip content={<CustomTooltip />} />
              
              {/* Smooth curved line (type="monotone") */}
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#1976d2" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}