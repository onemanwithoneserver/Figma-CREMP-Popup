import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

interface SummaryItem {
  label: string;
  value: string;
  highlight?: boolean;
}

const summaryItems: SummaryItem[] = [
  { label: 'Sale price', value: '₹ 1,250,000' },
  { label: 'Monthly income', value: '₹ 80,000' },
  { label: 'Net yield', value: '8%', highlight: true },
  { label: 'Stamp Duty & Registration', value: 'Applicable' },
];

const InvestmentSummary: React.FC = () => {
  return (
    <Box sx={{ padding: '4px', textAlign: 'left' }}>
      <Box
        sx={{
          padding: '12px',
          borderRadius: '6px',
          border: '1px solid #E5E7EB',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.3s ease',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#1C2A44', // Premium Navy
            marginBottom: '12px',
            letterSpacing: '0.01em',
            paddingLeft: '4px',
          }}
        >
          Investment summary
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
          }}
        >
          {summaryItems.map((item, idx) => (
            <Stack 
              key={idx} 
              spacing="4px"
              sx={{
                padding: '10px 12px',
                borderRadius: '6px',
              border: item.highlight ? '1px solid rgba(200, 155, 60, 0.2)' : '1px solid var(--border-default)',
              backgroundColor: item.highlight ? '#FFFCF5' : '#F9FAFB',
              cursor: 'default',
              }}
            >
              <Typography 
                sx={{ 
                  fontSize: '0.65rem', 
                  color: '#6B7280', // Refined muted gray
                  letterSpacing: '0.04em',
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: item.highlight ? '#C89B3C' : '#1C2A44', // Gold for highlight, Navy for standard
                  transition: 'color 150ms ease-in-out',
                }}
              >
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default InvestmentSummary;