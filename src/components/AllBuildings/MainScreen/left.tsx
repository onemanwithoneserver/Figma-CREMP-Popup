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
      onClick={onClick}
      sx={{
        padding: '4px 8px',
        cursor: 'pointer',
        borderRadius: '4px',
        backgroundColor: isActive ? 'var(--bg-app)' : 'transparent',
        color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)',
        fontWeight: 600,
        fontSize: '0.875rem',
        transition: 'all 150ms ease-in-out',
        borderLeft: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: 'var(--bg-app)',
          color: isActive ? 'var(--accent-gold)' : 'var(--text-main)',
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
        minWidth: '240px',
        padding: '16px',
        backgroundColor: 'var(--bg-card)',
        borderRight: '1px solid var(--border-default)',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography 
        sx={{ 
          fontSize: '1.125rem', 
          fontWeight: 600, 
          color: 'var(--text-main)', 
          marginBottom: '16px' 
        }}
      >
        Pages
      </Typography>

      <Typography
        sx={{ 
          fontSize: '0.75rem', 
          fontWeight: 600, 
          color: 'var(--text-muted)', 
          marginTop: '8px', 
          marginBottom: '8px',
    
          letterSpacing: '0.5px'
        }}
      >
        All buildings
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
      </Box>

      <Typography
        sx={{ 
          fontSize: '0.75rem', 
          fontWeight: 600, 
          color: 'var(--text-muted)', 
          marginTop: '24px', 
          marginBottom: '8px',
      
          letterSpacing: '0.5px'
        }}
      >
        Land
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
    </Box>
  );
};

export default LeftPanel;