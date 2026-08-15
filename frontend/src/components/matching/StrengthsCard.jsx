import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';

const StrengthsCard = ({ strengths = [] }) => (
  <Box>
    <Typography variant="h6" color="success.main" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CheckCircleOutlineIcon fontSize="small" /> Strengths
    </Typography>
    {strengths.length === 0 ? (
      <Typography variant="body2" color="text.secondary">No standout strengths identified.</Typography>
    ) : (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {strengths.map((s, i) => (
          <Chip key={i} label={s} color="success" variant="outlined" />
        ))}
      </Box>
    )}
  </Box>
);

export default StrengthsCard;