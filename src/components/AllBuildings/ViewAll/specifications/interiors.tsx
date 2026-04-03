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
        columnGap: '16px',
        rowGap: '4px',
        padding: '4px',
      }}
    >
      {interiorItems.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 8px',
            borderBottom: idx < interiorItems.length - 2 ? '1px solid var(--border-default)' : '1px solid transparent',
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

export default Interiors;