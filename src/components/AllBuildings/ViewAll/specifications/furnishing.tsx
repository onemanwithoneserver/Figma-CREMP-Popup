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
        columnGap: '16px',
        rowGap: '4px',
        padding: '4px',
      }}
    >
      {furnishingItems.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 8px',
            borderBottom: idx < furnishingItems.length - 2 ? '1px solid var(--border-default)' : '1px solid transparent',
            borderRadius: '4px',
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {item.label}
          </Typography>
          <Typography
            className="spec-value"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Furnishing;