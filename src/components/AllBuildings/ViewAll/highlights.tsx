import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

interface HighlightItemProps {
  value: string;
  unit?: string;
  label: string;
}

const HighlightItem: React.FC<HighlightItemProps> = ({ value, unit, label }) => (
  <Stack alignItems="center" spacing={0.25} sx={{ flex: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
      <Typography
        sx={{
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
      {unit && (
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 400,
            fontSize: '11px',
          }}
        >
          {unit}
        </Typography>
      )}
    </Box>
    <Typography
      sx={{
        color: 'rgba(255,255,255,0.8)',
        fontSize: '11px',
        fontWeight: 400,
      }}
    >
      {label}
    </Typography>
  </Stack>
);

const Highlights: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #1565c0 100%)',
        px: 2,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <HighlightItem value="1,200" unit="sq.ft." label="Size" />
      <Box sx={{ width: '1px', height: 32, backgroundColor: 'rgba(255,255,255,0.3)' }} />
      <HighlightItem value="₹ 2.5 Cr" label="Sale Value" />
      <Box sx={{ width: '1px', height: 32, backgroundColor: 'rgba(255,255,255,0.3)' }} />
      <HighlightItem value="8%" label="Expected Yield" />
    </Box>
  );
};

export default Highlights;
