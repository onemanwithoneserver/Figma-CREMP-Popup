import React from 'react';
import { Box, Typography } from '@mui/material';

interface SpecItem {
  label: string;
  value: string;
}

const interiorItems: SpecItem[] = [
  { label: 'Pantry', value: 'Yes' },
  { label: 'Washroom Inside Unit', value: 'Yes' },
  { label: 'Cabins / Partitions', value: 'Yes' },
  { label: 'Meeting Room', value: 'Yes' },
  { label: 'Conference Room', value: 'No' },
  { label: 'Reception Area', value: 'Yes' },
  { label: 'False Ceiling', value: 'Yes' },
  { label: 'Storage Space', value: 'Yes' },
  { label: 'Column Free', value: 'No' },
  { label: 'Branding Space Avail.', value: 'Yes' },
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
