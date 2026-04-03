import React from 'react';
import { Box, Typography } from '@mui/material';

interface SpecItem {
  label: string;
  value: string;
}

const readinessItems: SpecItem[] = [
  { label: 'Space Condition', value: 'Warm Shell' },
  { label: 'Flooring', value: 'Basic' },
  { label: 'Walls', value: 'Painted' },
  { label: 'Electricals', value: 'Fully Wired' },
  { label: 'HVAC', value: 'Installed' },
  { label: 'Lighting', value: 'Basic' },
  { label: 'Glass Facade', value: 'Yes' },
  { label: 'Fire Safety Compliance', value: 'Yes' },
];

const Readiness: React.FC = () => {
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
      {readinessItems.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 8px',
            borderBottom: idx < readinessItems.length - 2 ? '1px solid var(--border-default)' : '1px solid transparent',
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

export default Readiness;