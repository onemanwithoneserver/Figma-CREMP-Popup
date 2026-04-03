import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const allTags = [
  'Apparel & Fashion', 'Luxury Watches', 'Electronics', 'F&B', 'Salon / Spa', 'Pharmacy',
  'IT / Startup', 'Coworking', 'Corporate',
  'Art Gallery', 'Premium Cafe', 'Clinic', 'Showroom',
];

const SuitedFor: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  // Show 4 items initially to form a nice grid-like wrap before hiding the rest
  const tagsToShow = expanded ? allTags : allTags.slice(0, 4);

  return (
    <Box sx={{ padding: '4px', textAlign: 'left' }}>
      <Box
        sx={{
          padding: '12px',
          borderRadius: '6px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.3s ease',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#1C2A44',
            marginBottom: '10px',
            letterSpacing: '0.01em',
          }}
        >
          Suited for
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {tagsToShow.map((tag, idx) => (
            <Chip
              key={idx}
              icon={<CheckCircleIcon sx={{ fontSize: 16, color: '#C89B3C !important' }} />}
              label={tag}
              variant="outlined"
              sx={{
                borderRadius: '6px',
                borderColor: '#E5E7EB',
                backgroundColor: '#F9FAFB',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#4B5563',
                height: 30,
                transition: 'all 0.2s ease-in-out',
                cursor: 'default',
                '& .MuiChip-label': {
                  paddingLeft: '6px',
                  paddingRight: '10px',
                },
                '& .MuiChip-icon': {
                  marginLeft: '8px',
                },
              }}
            />
          ))}
          
          {allTags.length > 4 && (
            <Chip
              label={expanded ? 'View Less' : 'View More'}
              icon={
                expanded ? 
                <KeyboardArrowUpIcon sx={{ fontSize: 16, color: 'inherit !important' }} /> : 
                <KeyboardArrowDownIcon sx={{ fontSize: 16, color: 'inherit !important' }} />
              }
              onClick={() => setExpanded((prev) => !prev)}
              // Removed variant="outlined" and explicitly removed the border
              sx={{
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#1C2A44',
                height: 30,
                cursor: 'pointer',
                '& .MuiChip-label': {
                  paddingLeft: '6px',
                  paddingRight: '10px',
                },
                '& .MuiChip-icon': {
                  marginLeft: '8px',
                },
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SuitedFor;