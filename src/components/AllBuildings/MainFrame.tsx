import React, { useState } from 'react';
import { Box } from '@mui/material';
import LeftPanel from './MainScreen/left';
import MainScreen from './MainScreen';
import { ViewAll } from './ViewAll';
import LandMainFrame from '../Land/LandMainFrame';

const MainFrame: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('main');

  const renderContent = () => {
    switch (activePage) {
      case 'main':
        return <MainScreen />;
      case 'viewAll':
        return <ViewAll onBack={() => setActivePage('main')} />;
      case 'landMain':
        return <LandMainFrame initialPage="main" onBack={() => setActivePage('landMain')} />;
      case 'landViewAll':
        return <LandMainFrame initialPage="viewAll" onBack={() => setActivePage('landMain')} />;
      default:
        return <MainScreen />;
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: 'var(--bg-shell)',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      }}
    >
      {/* LEFT NAVIGATION PANEL */}
      <LeftPanel activePage={activePage} onPageSelect={setActivePage} />

      {/* CENTER MOBILE VIEWPORT AREA */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          height: '100%',
        }}
      >
        {/* THE "MOBILE PHONE" BOX */}
        <Box
          sx={{
            width: 360,
            height: '100%',
            maxHeight: '800px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid rgba(198, 156, 68, 0.25)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 32px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(198, 156, 68, 0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* CONTENT WRAPPER */}
          <Box
            sx={{
              flex: 1,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>

      {/* RIGHT SIDEBAR PANEL */}
      <Box
        sx={{
          width: '25%',
          minWidth: '240px',
          borderLeft: '1px solid rgba(198, 156, 68, 0.12)',
          backgroundColor: 'transparent',
          display: { xs: 'none', lg: 'block' },
        }}
      />
    </Box>
  );
};

export default MainFrame;