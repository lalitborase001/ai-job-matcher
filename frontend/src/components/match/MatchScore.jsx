import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { getScoreLabel, getScoreColor } from '../../utils/matchScore';

const MatchScore = ({ score = 0, size = 160, thickness = 8 }) => {
  const clamped = Math.max(0, Math.min(100, Number(score) || 0));
  const label = getScoreLabel(clamped);
  const color = getScoreColor(clamped);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={clamped}
          size={size}
          thickness={thickness}
          color={color === 'default' ? 'primary' : color}
        />
        <Box sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>{`${clamped}%`}</Typography>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchScore;