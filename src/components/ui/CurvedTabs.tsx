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
        filter: isActive ? 'drop-shadow(0px -2px 4px rgba(0,0,0,0.04))' : 'none',
        transition: 'all 150ms ease-in-out',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 4 40 L 12 4 Q 16 0 24 0 L 136 0 Q 144 0 148 4 L 156 40 Z"
        fill={isActive ? 'var(--bg-card)' : 'var(--bg-app)'}
        stroke={isActive ? 'var(--accent-gold)' : 'var(--border-default)'}
        strokeWidth={isActive ? '2' : '1'}
        vectorEffect="non-scaling-stroke"
        style={{ transition: 'all 150ms ease-in-out' }}
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
        justifyContent: 'flex-start',
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
              ml: isFirst ? 0 : '-16px',
              zIndex: isActive ? 10 : tabs.length - idx,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: isActive ? 'scale(1.02)' : 'none',
              transformOrigin: 'bottom center',
            }}
          >
            <TabShape isActive={isActive} />
            <Typography
              sx={{
                fontWeight: 600,
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                fontSize: '0.875rem',
                mt: isActive ? '-4px' : '0px',
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