import React, { useState } from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Header from './header';
import Highlights from './highlights';
import TabNavigation, { type ViewAllTab } from './tabNavigation';
import UnitDescription from './unitDescription';
import MediaAndTour from './mediaAndTour';
import Specifications from './Specifications';
import Facilities from './facilities';
import SuitedFor from './suitedFor';
import InvestmentSummary from './investmentSummary';
import Footer from './footer';

interface ViewAllProps {
  onBack?: () => void;
}

const KeyIconItem: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <Stack 
    direction="row" 
    alignItems="center" 
    spacing="4px" 
    sx={{ 
      flex: 1,
      padding: '4px',
      borderRadius: '4px',
      backgroundColor: 'var(--bg-app)',
      border: '1px solid var(--border-default)',
    }}
  >
    <Box sx={{ width: 28, height: 28, borderRadius: '4px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', flexShrink: 0 }}>
      {icon}
    </Box>
    <Stack spacing={0}>
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
        {label}
      </Typography>
    </Stack>
  </Stack>
);

const ViewAll: React.FC<ViewAllProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<ViewAllTab>('unitDetails');

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)', overflow: 'hidden' }}>
      
      {/* --- 1. THE SCROLLABLE AREA --- */}
      {/* Moving everything except the Tab Bar and Footer here makes them scrollable */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'var(--border-default)', borderRadius: '4px' },
        }}
      >
        {/* Everything from your screenshot now scrolls: */}
        <Header onBack={onBack} />
        <Highlights />
        
        <Box sx={{ padding: '8px', backgroundColor: 'var(--bg-card)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '8px' }}>
            <Box>
              <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
                Retail Unit A105
              </Typography>
              <Stack direction="row" alignItems="center" spacing="4px" sx={{ mt: '4px' }}>
                <LocationOnIcon sx={{ fontSize: 14, color: 'var(--accent-gold)' }} />
                <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Ground Floor, XYZ Mall, Manhattan
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ px: '8px', py: '2px', backgroundColor: 'var(--bg-app)', borderRadius: '4px', border: '1px solid var(--border-default)' }}>
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--accent-gold)'}}>
                Available
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: '8px' }}>
            <KeyIconItem icon={<StorefrontIcon sx={{ fontSize: 16 }} />} value="25 ft" label="Frontage" />
            <KeyIconItem icon={<PeopleAltIcon sx={{ fontSize: 16 }} />} value="High" label="Footfall" />
            <KeyIconItem icon={<VisibilityIcon sx={{ fontSize: 16 }} />} value="Main Road" label="Visibility" />
          </Box>
        </Box>

        {/* --- 2. THE STICKY TABS --- */}
        {/* We use position: sticky so the tabs stay at the top when the content below slides under them */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--bg-card)' }}>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </Box>

        {/* Content Sections */}
        <Box sx={{ p: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <UnitDescription />
          <Divider sx={{ mx: 1, borderColor: 'var(--border-default)' }} />
          <MediaAndTour />
          <Divider sx={{ mx: 1, borderColor: 'var(--border-default)' }} />
          <Specifications />
          <Divider sx={{ mx: 1, borderColor: 'var(--border-default)' }} />
          <Facilities />
          <Divider sx={{ mx: 1, borderColor: 'var(--border-default)' }} />
          <SuitedFor />
          <Divider sx={{ mx: 1, borderColor: 'var(--border-default)' }} />
          <InvestmentSummary />
        </Box>
      </Box>

      {/* --- 3. FIXED FOOTER --- */}
      <Box sx={{ flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default ViewAll;