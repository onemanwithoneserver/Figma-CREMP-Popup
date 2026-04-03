import React from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface LandHeaderProps {
  onBack?: () => void;
}

const LandHeader: React.FC<LandHeaderProps> = ({ onBack }) => {
  return (
    <Box sx={{ padding: '4px' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 220,
          overflow: 'hidden',
          borderRadius: '4px',
          border: '1px solid var(--border-default)',
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
          alt="Land Plot Hero, Hyderabad"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(15, 26, 44, 0.85) 0%, transparent 100%)',
          }}
        />

        <IconButton
          disableRipple
          onClick={onBack}
          sx={{
            position: 'absolute',
            top: '4px',
            left: '4px',
            backgroundColor: 'var(--bg-card)',
            width: 32,
            height: 32,
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
            color: 'var(--text-main)',
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16, color: 'inherit' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default LandHeader;
