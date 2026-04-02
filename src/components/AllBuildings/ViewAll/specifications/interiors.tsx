import React from 'react';
import { Box, Typography } from '@mui/material';

interface SpecItem {
  label: string;
  value: string;
}

const interiorItems: SpecItem[] = [
  { label: 'Wall Finish', value: 'Painted' },
  { label: 'Door Type', value: 'Glass' },
  { label: 'Window', value: 'Aluminium' },
  { label: 'Washroom', value: 'Common' },
  { label: 'Fire Safety', value: 'Installed' },
  { label: 'Signage', value: 'Provision' },
];

const Interiors: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
      }}
    >
      {interiorItems.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            px: 0.5,
            borderBottom: idx < interiorItems.length - 2 ? '1px solid #f0f0f0' : 'none',
          }}
        >
          <Typography sx={{ fontSize: '12px', color: '#888' }}>
            {item.label}
          </Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1a237e' }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Interiors;
