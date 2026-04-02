import React from 'react';
import { Box, Typography } from '@mui/material';

export interface CurvedTabOption {
  label: string;
  value: string;
}

interface CurvedTabsProps {
  tabs: CurvedTabOption[];
  activeTab: string;
  onChange: (value: string) => void;
}

const TabShape: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <svg
      viewBox="0 0 160 40"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        filter: isActive ? 'drop-shadow(0px -2px 4px rgba(0,0,0,0.05))' : 'none',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 5 40 L 15 5 Q 18 0 25 0 L 135 0 Q 142 0 145 5 L 155 40 Z"
        fill={isActive ? '#FFFFFF' : '#F4F6F8'}
        stroke={isActive ? '#C8A45A' : '#E0E0E0'}
        strokeWidth={isActive ? '1.5' : '1'}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export const CurvedTabs: React.FC<CurvedTabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        // Slight negative margin for overlapping effect
        ml: { xs: -1, sm: -2 },
      }}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.value;
        const isFirst = idx === 0;

        return (
          <Box
            key={tab.value}
            onClick={() => onChange(tab.value)}
            sx={{
              position: 'relative',
              width: { xs: '160px', sm: '180px' },
              height: isActive ? '48px' : '44px',
              ml: isFirst ? 0 : '-16px', // Overlap effect
              zIndex: isActive ? 10 : tabs.length - idx,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease-in-out',
              transform: isActive ? 'scale(1.05)' : 'none',
              transformOrigin: 'bottom center',
              '&:hover': {
                transform: isActive ? 'scale(1.05)' : 'translateY(-2px)',
                opacity: isActive ? 1 : 0.9,
              },
            }}
          >
            <TabShape isActive={isActive} />
            <Typography
              sx={{
                fontWeight: 700,
                letterSpacing: '1px',
                color: isActive ? '#121C2D' : '#727C8E',
                fontSize: { xs: '13px', sm: '15px' },
                textTransform: 'uppercase',
                mt: isActive ? '-4px' : '0px',
                transition: 'color 0.3s ease-in-out',
                userSelect: 'none',
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
