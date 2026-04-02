import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SpecTabNavigation from './specifications/tabNavigation';
import type { SpecTab } from './specifications/tabNavigation';
import Readiness from './specifications/readiness';
import Furnishing from './specifications/furnishing';
import Interiors from './specifications/interiors';

const Specifications: React.FC = () => {
  const [activeSpecTab, setActiveSpecTab] = useState<SpecTab>('readiness');

  const renderSpecContent = () => {
    switch (activeSpecTab) {
      case 'readiness':
        return <Readiness />;
      case 'furnishing':
        return <Furnishing />;
      case 'interiors':
        return <Interiors />;
      default:
        return <Readiness />;
    }
  };

  return (
    <Box sx={{ px: 2, py: 1.5 }}>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          color: '#1a237e',
          mb: 1.5,
        }}
      >
        Specifications
      </Typography>
      <SpecTabNavigation activeTab={activeSpecTab} onTabChange={setActiveSpecTab} />
      {renderSpecContent()}
    </Box>
  );
};

export default Specifications;
