import React from 'react';
import { Box, Typography } from '@mui/material';

interface SpecItem {
  label: string;
  value: string;
}

const furnishingItems: SpecItem[] = [
  { label: 'Type', value: 'Semi-Furnished' },
  { label: 'Workstations', value: 'Not Included' },
  { label: 'Cabins', value: 'Not Included' },
  { label: 'Pantry', value: 'Provision' },
  { label: 'Reception', value: 'Not Included' },
  { label: 'Storage', value: 'Available' },
];

const Furnishing: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
      }}
    >
      {furnishingItems.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            px: 0.5,
            borderBottom: idx < furnishingItems.length - 2 ? '1px solid #f0f0f0' : 'none',
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

export default Furnishing;
