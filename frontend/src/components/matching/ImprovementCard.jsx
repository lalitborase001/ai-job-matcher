import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const ImprovementsCard = ({ improvements = [] }) => (
  <>
    <Typography variant="h6" color="warning.main" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LightbulbOutlinedIcon fontSize="small" /> Suggested Improvements
    </Typography>
    {improvements.length === 0 ? (
      <Typography variant="body2" color="text.secondary">No suggestions available.</Typography>
    ) : (
      <List dense disablePadding>
        {improvements.map((item, i) => (
          <ListItem key={i} disablePadding sx={{ mb: 1 }}>
            <ListItemText primary={`• ${item}`} />
          </ListItem>
        ))}
      </List>
    )}
  </>
);

export default ImprovementsCard;