import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const suitedCategories = [
  'Apparel & Fashion',
  'Luxury Watches',
  'Art Gallery',
  'Premium Cafe',
];

const SuitedFor: React.FC = () => {
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
        Suited for
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.75,
        }}
      >
        {suitedCategories.map((category, idx) => (
          <Chip
            key={idx}
            icon={<CheckCircleIcon sx={{ fontSize: 14, color: '#4caf50 !important' }} />}
            label={category}
            variant="outlined"
            sx={{
              borderRadius: '20px',
              borderColor: '#e0e0e0',
              backgroundColor: '#fafafa',
              fontSize: '11px',
              fontWeight: 500,
              color: '#1a237e',
              height: 28,
              '& .MuiChip-label': {
                px: 1,
              },
              '& .MuiChip-icon': {
                ml: 0.5,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SuitedFor;
