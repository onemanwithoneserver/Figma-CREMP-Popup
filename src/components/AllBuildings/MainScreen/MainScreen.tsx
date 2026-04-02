import React, { useState } from 'react';
import { Box } from '@mui/material';
import TabNavigation from './tabNavigation';
import RetailSpaces from './retailSpaces';
import OfficeSpace from './officeSpace';
import CoWorkingSpaces from './coWorkingSpaces';

type TabType = 'retail' | 'office' | 'coworking';

const MainScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('retail');

  const renderContent = () => {
    switch (selectedTab) {
      case 'retail':
        return <RetailSpaces />;
      case 'office':
        return <OfficeSpace />;
      case 'coworking':
        return <CoWorkingSpaces />;
      default:
        return <RetailSpaces />;
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <TabNavigation selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default MainScreen;
