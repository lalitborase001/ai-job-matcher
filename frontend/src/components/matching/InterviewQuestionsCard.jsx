import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

const InterviewQuestionsCard = ({ questions = [] }) => (
  <>
    <Typography variant="h6" color="info.main" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <QuestionAnswerOutlinedIcon fontSize="small" /> Prep Questions
    </Typography>
    {questions.length === 0 ? (
      <Typography variant="body2" color="text.secondary">No questions generated.</Typography>
    ) : (
      <List dense disablePadding>
        {questions.map((item, i) => (
          <ListItem key={i} disablePadding sx={{ mb: 1 }}>
            <ListItemText primary={`• ${item}`} />
          </ListItem>
        ))}
      </List>
    )}
  </>
);

export default InterviewQuestionsCard;