import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SuitedCategory {
  title: string;
  tags: string[];
}

const categories: SuitedCategory[] = [
  {
    title: '🏬 Retail Categories',
    tags: ['Apparel & Fashion', 'Luxury Watches', 'Electronics', 'F&B (Restaurant / Cafe)', 'Salon / Spa', 'Pharmacy'],
  },
  {
    title: '🏢 Office Use',
    tags: ['IT / Startup Office', 'Coworking', 'Corporate Office'],
  },
  {
    title: '🏠 Also Suitable For',
    tags: ['Art Gallery', 'Premium Cafe', 'Clinic', 'Showroom'],
  },
];

const SuitedFor: React.FC = () => {
  return (
    <Box sx={{ px: 2, py: 2, textAlign: 'left' }}>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#1a237e',
          mb: 3,
        }}
      >
        Suited for
      </Typography>

      <Stack spacing={3}>
        {categories.map((category, catIdx) => (
          <Box key={catIdx}>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#555', mb: 1.5 }}>
              {category.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {category.tags.map((tag, idx) => (
                <Chip
                  key={idx}
                  icon={<CheckCircleIcon sx={{ fontSize: 16, color: '#4caf50 !important' }} />}
                  label={tag}
                  variant="outlined"
                  sx={{
                    borderRadius: '4px',
                    borderColor: '#e0e0e0',
                    backgroundColor: '#fafafa',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#1a237e',
                    height: 32,
                    '& .MuiChip-label': {
                      px: 1,
                    },
                    '& .MuiChip-icon': {
                      ml: 1,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default SuitedFor;
