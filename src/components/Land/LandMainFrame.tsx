import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
// import removed: LandMainScreen
import LandViewAll from './ViewAll/LandViewAll';

interface LandMainFrameProps {
  initialPage?: 'main' | 'viewAll';
  onBack?: () => void;
}

const LandMainFrame: React.FC<LandMainFrameProps> = ({ initialPage = 'main', onBack }) => {
  const [activePage, setActivePage] = useState<'main' | 'viewAll'>(initialPage);

  // Update active page when initialPage prop changes
  useEffect(() => {
    setActivePage(initialPage);
  }, [initialPage]);

  const handleViewAll = () => {
    setActivePage('viewAll');
  };

  const handleBack = () => {
    setActivePage('main');
    onBack?.();
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
      {activePage === 'main' ? (
        {/* LandMainScreen removed */}
      ) : (
        <LandViewAll onBack={handleBack} />
      )}
    </Box>
  );
};

export default LandMainFrame;
