import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SuitedCategory {
  title: string;
  tags: string[];
}

const categories: SuitedCategory[] = [
  {
    title: 'Retail Categories',
    tags: ['Apparel & Fashion', 'Luxury Watches', 'Electronics', 'F&B (Restaurant / Cafe)', 'Salon / Spa', 'Pharmacy'],
  },
  {
    title: 'Office Use',
    tags: ['IT / Startup Office', 'Coworking', 'Corporate Office'],
  },
  {
    title: 'Also Suitable For',
    tags: ['Art Gallery', 'Premium Cafe', 'Clinic', 'Showroom'],
  },
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

      <Stack spacing={2}>
        {categories.map((category, catIdx) => (
          <Box key={catIdx}>
            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#555', mb: 1 }}>
              {category.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.75,
              }}
            >
              {category.tags.map((tag, idx) => (
                <Chip
                  key={idx}
                  icon={<CheckCircleIcon sx={{ fontSize: 14, color: '#4caf50 !important' }} />}
                  label={tag}
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
        ))}
      </Stack>
    </Box>
  );
};

export default SuitedFor;
