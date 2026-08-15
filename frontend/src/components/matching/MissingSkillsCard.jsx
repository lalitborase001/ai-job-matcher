import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const MissingSkillsCard = ({ missingSkills = [] }) => (
  <Box>
    <Typography variant="h6" color="error.main" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <HighlightOffIcon fontSize="small" /> Missing Skills
    </Typography>
    {missingSkills.length === 0 ? (
      <Typography variant="body2" color="text.secondary">No major gaps found.</Typography>
    ) : (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {missingSkills.map((s, i) => (
          <Chip key={i} label={s} color="error" variant="outlined" />
        ))}
      </Box>
    )}
  </Box>
);

export default MissingSkillsCard;