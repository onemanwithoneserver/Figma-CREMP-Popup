import React from 'react';
import { Box, Typography } from '@mui/material';

export type ViewAllTab = 'unitDetails' | 'media' | 'specs' | 'facilities' | 'suited';

interface TabNavigationProps {
  activeTab: ViewAllTab;
  onTabChange: (tab: ViewAllTab) => void;
}

const tabs: { id: ViewAllTab; label: string }[] = [
  { id: 'unitDetails', label: 'Unit details' },
  { id: 'media', label: 'Media' },
  { id: 'specs', label: 'Specs' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'suited', label: 'Suited' },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid #e0e0e0',
        overflowX: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Box
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            sx={{
              px: 1.5,
              py: 1.25,
              cursor: 'pointer',
              position: 'relative',
              flexShrink: 0,
              borderBottom: isActive ? '2px solid #1a237e' : '2px solid transparent',
              transition: 'border-color 0.2s ease',
            }}
          >
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#1a237e' : '#888',
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

export default TabNavigation;
