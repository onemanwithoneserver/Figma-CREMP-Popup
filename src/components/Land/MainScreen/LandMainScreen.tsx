import React, { useState } from 'react';
import { Box } from '@mui/material';
import LandTopSection from './landTopSection';
import LandTabNavigation from './landTabNavigation';
import LandRent from './landRent';
import LandLease from './landLease';

type LandTabType = 'rent' | 'lease';

interface LandMainScreenProps {
  onViewAll?: () => void;
}

const LandMainScreen: React.FC<LandMainScreenProps> = ({ onViewAll }) => {
  const [selectedTab, setSelectedTab] = useState<LandTabType>('rent');

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'rent':
        return <LandRent onViewAll={onViewAll} />;
      case 'lease':
        return <LandLease onViewAll={onViewAll} />;
      default:
        return <LandRent onViewAll={onViewAll} />;
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '4px',
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--border-default)',
            borderRadius: '4px',
          },
        }}
      >
        <LandTopSection />

        <LandTabNavigation selectedTab={selectedTab} onTabChange={setSelectedTab} />

        <Box
          sx={{
            paddingBottom: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default LandMainScreen;
