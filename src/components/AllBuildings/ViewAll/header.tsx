import React from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface HeaderProps {
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 220,
        overflow: 'hidden',
      }}
    >
      {/* Hero Image */}
      <Box
        component="img"
        src="/images/viewall/hero.png"
        alt="Retail Unit Hero"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Gradient Overlay (bottom fade) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)',
        }}
      />

      {/* Back Button */}
      <IconButton
        onClick={onBack}
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          backgroundColor: 'rgba(255,255,255,0.85)',
          width: 32,
          height: 32,
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.95)',
          },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 18, color: '#1a237e' }} />
      </IconButton>
    </Box>
  );
};

export default Header;
