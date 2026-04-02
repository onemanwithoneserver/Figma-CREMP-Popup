import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LeftPanel from './MainScreen/left';
import MainScreen from './MainScreen';
import { ViewAll } from './ViewAll';

const MainFrame: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('main');

  const renderContent = () => {
    switch (activePage) {
      case 'main':
        return <MainScreen />;
      case 'viewAll':
        return <ViewAll onBack={() => setActivePage('main')} />;
      case 'landMain':
        return (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Land Main - Coming Soon
            </Typography>
          </Box>
        );
      case 'landViewAll':
        return (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Land View All - Coming Soon
            </Typography>
          </Box>
        );
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
        overflow: 'hidden', // Prevents the browser window itself from scrolling
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
            maxHeight: '800px', // Standard mobile height ratio
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 12px 36px rgba(28, 42, 68, 0.16)',
            position: 'relative',
            overflow: 'hidden', // CRITICAL: Keeps the scroll inside the frame
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
          borderLeft: '1px solid var(--border-default)',
          backgroundColor: 'var(--bg-card)',
          display: { xs: 'none', lg: 'block' },
        }}
      />
    </Box>
  );
};

export default MainFrame;