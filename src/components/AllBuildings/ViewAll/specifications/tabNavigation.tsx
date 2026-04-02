import React from 'react';
import { Box, Typography } from '@mui/material';

export type SpecTab = 'readiness' | 'furnishing' | 'interiors';

interface SpecTabNavigationProps {
  activeTab: SpecTab;
  onTabChange: (tab: SpecTab) => void;
}

const specTabs: { id: SpecTab; label: string }[] = [
  { id: 'readiness', label: 'Readiness' },
  { id: 'furnishing', label: 'Furnishing' },
  { id: 'interiors', label: 'Interiors' },
];

const SpecTabNavigation: React.FC<SpecTabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        mb: 1.5,
      }}
    >
      {specTabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Box
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: '20px',
              backgroundColor: isActive ? '#1a237e' : '#f0f0f0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: isActive ? '1px solid #1a237e' : '1px solid #e0e0e0',
              '&:hover': {
                backgroundColor: isActive ? '#283593' : '#e8e8e8',
              },
            }}
          >
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#FFFFFF' : '#666',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default SpecTabNavigation;
