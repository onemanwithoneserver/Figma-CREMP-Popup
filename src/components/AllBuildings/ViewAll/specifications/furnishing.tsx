import React from 'react';
import { Box, Typography } from '@mui/material';

interface SpecItem {
  label: string;
  value: string;
}

const furnishingItems: SpecItem[] = [
  { label: 'Workstations Count', value: '45' },
  { label: 'Chairs', value: '50' },
  { label: 'Cabins', value: '2' },
  { label: 'Cupboards', value: '5' },
  { label: 'Sofa / Lounge', value: 'Yes' },
  { label: 'Reception Desk', value: 'Yes' },
  { label: 'Pantry Equipment', value: 'Microwave, Fridge' },
  { label: 'Internet Ready', value: 'Yes' },
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
