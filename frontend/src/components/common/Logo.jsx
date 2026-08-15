import { Box, Typography, useTheme } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Logo = ({ showText = true, variant = 'navbar', onClick }) => {
  const theme = useTheme();

  // Different sizing based on variant (navbar, sidebar, login, etc.)
  const iconSize = variant === 'large' ? 48 : 34;
  const fontSize = variant === 'large' ? 'h5' : 'h6';
  const iconFontSize = variant === 'large' ? '1.5rem' : '1.2rem';

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        cursor: onClick ? 'pointer' : 'default',
        gap: 1.5
      }} 
      onClick={onClick}
    >
      <Box 
        sx={{ 
          width: iconSize, 
          height: iconSize, 
          bgcolor: 'primary.main', 
          borderRadius: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)'
        }}
      >
        <AutoAwesomeIcon sx={{ color: '#fff', fontSize: iconFontSize }} />
      </Box>
      {showText && (
        <Typography
          variant={fontSize}
          sx={{ 
            fontWeight: 700, 
            color: 'text.primary',
            letterSpacing: '-0.5px',
            whiteSpace: 'nowrap'
          }}
        >
          AI Resume Matcher
        </Typography>
      )}
    </Box>
  );
};

export default Logo;
