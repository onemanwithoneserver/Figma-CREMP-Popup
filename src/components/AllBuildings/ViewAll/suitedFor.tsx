import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



const allTags = [
  'Apparel & Fashion', 'Luxury Watches', 'Electronics', 'F&B', 'Salon / Spa', 'Pharmacy',
  'IT / Startup', 'Coworking', 'Corporate',
  'Art Gallery', 'Premium Cafe', 'Clinic', 'Showroom',
];



const SuitedFor: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const tagsToShow = expanded ? allTags : allTags.slice(0, 3);

  return (
    <Box sx={{ padding: '4px' }}>
      <Box
        sx={{
          padding: '4px',
          borderRadius: '4px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            marginBottom: '8px',
            paddingLeft: '4px',
          }}
        >
          Suited for
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            paddingLeft: '4px',
          }}
        >
          {tagsToShow.map((tag, idx) => (
            <Chip
              key={idx}
              icon={<CheckCircleIcon sx={{ fontSize: 14, color: 'var(--accent-gold) !important' }} />}
              label={tag}
              variant="outlined"
              sx={{
                borderRadius: '4px',
                borderColor: 'var(--border-default)',
                backgroundColor: 'var(--bg-app)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                height: 28,
                transition: 'all 150ms ease-in-out',
                '&:hover': {
                  borderColor: 'var(--accent-gold)',
                  backgroundColor: 'var(--bg-card)',
                },
                '& .MuiChip-label': {
                  paddingLeft: '4px',
                  paddingRight: '8px',
                },
                '& .MuiChip-icon': {
                  marginLeft: '4px',
                },
              }}
            />
          ))}
          {allTags.length > 3 && (
            <Chip
              label={expanded ? 'View Less' : 'View More'}
              onClick={() => setExpanded((prev) => !prev)}
              variant="outlined"
              sx={{
                borderRadius: '4px',
                borderColor: 'var(--accent-gold)',
                backgroundColor: 'var(--bg-app)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--accent-gold)',
                height: 28,
                cursor: 'pointer',
                marginLeft: '4px',
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SuitedFor;