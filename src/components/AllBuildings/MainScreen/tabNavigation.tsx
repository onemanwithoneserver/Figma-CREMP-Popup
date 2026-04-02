import React from 'react';
import { Box, Typography } from '@mui/material';

type TabType = 'retail' | 'office' | 'coworking';

interface TabNavigationProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        px: 3,
        py: 1.5,
        borderRadius: 20,
        backgroundColor: isActive ? '#1a237e' : '#f0f0f0',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: isActive ? '#283593' : '#e0e0e0',
        },
      }}
    >
      <Typography
        variant="body2"
        fontWeight={isActive ? '600' : '400'}
        sx={{
          color: isActive ? '#FFFFFF' : '#666666',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const TabNavigation: React.FC<TabNavigationProps> = ({ selectedTab, onTabChange }) => {
  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        display: 'flex',
        gap: 1,
        justifyContent: 'flex-start',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <TabButton
        label="Retail"
        isActive={selectedTab === 'retail'}
        onClick={() => onTabChange('retail')}
      />
      <TabButton
        label="Office"
        isActive={selectedTab === 'office'}
        onClick={() => onTabChange('office')}
      />
      <TabButton
        label="Co-working"
        isActive={selectedTab === 'coworking'}
        onClick={() => onTabChange('coworking')}
      />
    </Box>
  );
};

export default TabNavigation;
