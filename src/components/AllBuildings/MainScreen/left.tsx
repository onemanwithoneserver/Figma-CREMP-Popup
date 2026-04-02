import React from 'react';
import { Box, Typography } from '@mui/material';

interface LeftPanelProps {
  activePage: string;
  onPageSelect: (page: string) => void;
}

interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, isActive, onClick }) => {
  return (
    <Typography
      variant="body2"
      onClick={onClick}
      sx={{
        py: 0.5,
        px: 1,
        cursor: 'pointer',
        borderRadius: 1,
        backgroundColor: isActive ? '#e8eaf6' : 'transparent',
        color: isActive ? '#1a237e' : '#666666',
        fontWeight: isActive ? '600' : '400',
        '&:hover': {
          backgroundColor: isActive ? '#e8eaf6' : '#f5f5f5',
        },
      }}
    >
      {label}
    </Typography>
  );
};

const LeftPanel: React.FC<LeftPanelProps> = ({ activePage, onPageSelect }) => {
  return (
    <Box
      sx={{
        width: '25%',
        p: 3,
        backgroundColor: '#F5F5F5',
        borderRight: '1px solid #e0e0e0',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Pages
      </Typography>

      {/* All Buildings Section */}
      <Typography
        variant="subtitle2"
        fontWeight="600"
        sx={{ mt: 2, mb: 1, color: '#333333' }}
      >
        All buildings
      </Typography>
      <NavItem
        label="1. Main screen"
        isActive={activePage === 'main'}
        onClick={() => onPageSelect('main')}
      />
      <NavItem
        label="2. View All"
        isActive={activePage === 'viewAll'}
        onClick={() => onPageSelect('viewAll')}
      />

      {/* Land Section */}
      <Typography
        variant="subtitle2"
        fontWeight="600"
        sx={{ mt: 3, mb: 1, color: '#333333' }}
      >
        Land
      </Typography>
      <NavItem
        label="1. Main screen"
        isActive={activePage === 'landMain'}
        onClick={() => onPageSelect('landMain')}
      />
      <NavItem
        label="2. View All"
        isActive={activePage === 'landViewAll'}
        onClick={() => onPageSelect('landViewAll')}
      />
    </Box>
  );
};

export default LeftPanel;
