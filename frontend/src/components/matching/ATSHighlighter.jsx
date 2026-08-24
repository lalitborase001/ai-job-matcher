import React from 'react';
import { Typography } from '@mui/material';

export default function ATSHighlighter({ text, matchedSkills = [], missingSkills = [] }) {
  if (!text) return null;

  // 1. Combine all skills and filter out any empty strings
  const allSkills = [...matchedSkills, ...missingSkills].filter(Boolean);

  if (allSkills.length === 0) {
    return <Typography variant="body1">{text}</Typography>;
  }

  // 2. Escape special characters (like C++ or .NET) so they don't break the Regex
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // 3. Sort skills by length descending! 
  // (This ensures we highlight "Spring Boot" instead of just "Spring")
  const sortedSkills = allSkills.sort((a, b) => b.length - a.length);
  
  // 4. Create a dynamic Regex pattern that looks for whole words (\b) case-insensitively (gi)
  const pattern = new RegExp(`\\b(${sortedSkills.map(escapeRegExp).join('|')})\\b`, 'gi');

  // 5. Split the text by the matched keywords
  const parts = text.split(pattern);

  return (
    <Typography 
      variant="body1" 
      sx={{ 
        whiteSpace: 'pre-wrap', 
        lineHeight: 1.8, 
        color: 'text.secondary' 
      }}
    >
      {parts.map((part, index) => {
        const lowerPart = part.toLowerCase();
        
        // Check if this specific part is in our matched or missing arrays
        const isMatched = matchedSkills.some(s => s.toLowerCase() === lowerPart);
        const isMissing = missingSkills.some(s => s.toLowerCase() === lowerPart);

        if (isMatched) {
          return (
            <mark 
              key={index} 
              style={{ 
                backgroundColor: '#e6f4ea', 
                color: '#1e8e3e', 
                padding: '2px 6px', 
                borderRadius: '4px', 
                fontWeight: 700 
              }}
            >
              {part}
            </mark>
          );
        }
        
        if (isMissing) {
          return (
            <mark 
              key={index} 
              style={{ 
                backgroundColor: '#fce8e6', 
                color: '#d93025', 
                padding: '2px 6px', 
                borderRadius: '4px', 
                fontWeight: 700 
              }}
            >
              {part}
            </mark>
          );
        }
        
        // If it's just normal text, return it without formatting
        return <span key={index}>{part}</span>;
      })}
    </Typography>
  );
}