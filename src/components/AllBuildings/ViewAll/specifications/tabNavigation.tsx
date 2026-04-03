import React from 'react';
import { Box, Stack } from '@mui/material';

export type SpecTab = 'readiness' | 'furnishing' | 'interiors';

interface SpecTabNavigationProps {
  activeTab: SpecTab;
  onTabChange: (tab: SpecTab) => void;
}

const specTabs: { value: SpecTab; label: string }[] = [
  { value: 'readiness', label: 'Readiness' },
  { value: 'furnishing', label: 'Furnishing' },
  { value: 'interiors', label: 'Interiors' },
];

const SpecTabNavigation: React.FC<SpecTabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <Box sx={{ mb: '4px' }}>
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ 
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {specTabs.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <Box
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              sx={{
                padding: '6px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
                background: isActive ? 'linear-gradient(to bottom right, #1C2A44, #154eb1)' : '#F3F4F6', 
                color: isActive ? '#FFFFFF' : '#4B5563',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {tab.label}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SpecTabNavigation;