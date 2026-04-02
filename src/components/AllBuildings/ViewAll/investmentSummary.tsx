import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

interface SummaryItem {
  label: string;
  value: string;
  valueColor?: string;
}

const summaryItems: SummaryItem[] = [
  { label: 'Sale price', value: '₹ 1,250,000', valueColor: '#1a237e' },
  { label: 'Monthly income', value: '₹ 80,000', valueColor: '#1a237e' },
  { label: 'Net yield', value: '8%', valueColor: '#4caf50' },
  { label: 'Stamp Duty & Registration', value: 'Applicable', valueColor: '#1a237e' },
];

const InvestmentSummary: React.FC = () => {
  return (
    <Box sx={{ px: 2, py: 1.5 }}>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          color: '#1a237e',
          mb: 1.5,
        }}
      >
        Investment summary
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1.5,
        }}
      >
        {summaryItems.map((item, idx) => (
          <Stack key={idx} spacing={0.25}>
            <Typography sx={{ fontSize: '11px', color: '#888' }}>
              {item.label}
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                color: item.valueColor || '#1a237e',
              }}
            >
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default InvestmentSummary;
