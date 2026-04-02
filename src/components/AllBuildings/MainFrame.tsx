import React, { useState } from 'react';
import { Box } from '@mui/material';
import LeftPanel from './MainScreen/left';
import MainScreen from './MainScreen';

const MainFrame: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('main');

  const renderContent = () => {
    switch (activePage) {
      case 'main':
        return <MainScreen />;
      case 'viewAll':
        return <Box sx={{ p: 2 }}>View All - Coming Soon</Box>;
      case 'landMain':
        return <Box sx={{ p: 2 }}>Land Main - Coming Soon</Box>;
      case 'landViewAll':
        return <Box sx={{ p: 2 }}>Land View All - Coming Soon</Box>;
      default:
        return <MainScreen />;
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* LEFT PAGES PANEL */}
      <LeftPanel activePage={activePage} onPageSelect={setActivePage} />

      {/* MOBILE FRAME (CENTER) */}
      <Box
        sx={{
          width: 360,
          height: '100%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #222',
          borderRadius: '2px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          mx: 'auto',
        }}
      >
        {renderContent()}
      </Box>

      {/* RIGHT EMPTY PANEL */}
      <Box
        sx={{
          width: '25%',
        }}
      />
    </Box>
  );
};

export default MainFrame;
