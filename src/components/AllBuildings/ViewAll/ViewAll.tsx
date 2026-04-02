import React, { useState } from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Header from './header';
import Highlights from './highlights';
import TabNavigation from './tabNavigation';
import type { ViewAllTab } from './tabNavigation';
import UnitDescription from './unitDescription';
import MediaAndTour from './mediaAndTour';
import Facilities from './facilities';
import SuitedFor from './suitedFor';
import InvestmentSummary from './investmentSummary';
import Footer from './footer';
import Specifications from './Specifications';

interface ViewAllProps {
  onBack?: () => void;
}

/* ---- Key Icons Row ---- */
interface KeyIconItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const keyIcons: KeyIconItemProps[] = [
  {
    icon: <StorefrontIcon sx={{ fontSize: 18 }} />,
    value: '25 ft',
    label: 'Frontage',
  },
  {
    icon: <PeopleAltIcon sx={{ fontSize: 18 }} />,
    value: 'High',
    label: 'Footfall',
  },
  {
    icon: <VisibilityIcon sx={{ fontSize: 18 }} />,
    value: 'Main Road',
    label: 'Visibility',
  },
];

const KeyIconItem: React.FC<KeyIconItemProps> = ({ icon, value, label }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        backgroundColor: '#fdf6e3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c8a45a',
      }}
    >
      {icon}
    </Box>
    <Stack spacing={0}>
      <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#222', lineHeight: 1.3 }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: '10px', color: '#888', lineHeight: 1.3 }}>
        {label}
      </Typography>
    </Stack>
  </Stack>
);

const ViewAll: React.FC<ViewAllProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<ViewAllTab>('unitDetails');

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Scrollable body */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.15)',
            borderRadius: 4,
          },
        }}
      >
        {/* 1. Header Image */}
        <Header onBack={onBack} />

        {/* 2. Blue Highlights Strip */}
        <Highlights />

        {/* 3. Title Section */}
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#222',
                  lineHeight: 1.2,
                }}
              >
                Retail Unit A105
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                <LocationOnIcon sx={{ fontSize: 14, color: '#1a237e' }} />
                <Typography sx={{ fontSize: '12px', color: '#666' }}>
                  Ground Floor, XYZ Mall, Manhattan
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                backgroundColor: '#e8f5e9',
                borderRadius: '6px',
                flexShrink: 0,
                mt: 0.25,
              }}
            >
              <Typography
                sx={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#2e7d32',
                  whiteSpace: 'nowrap',
                }}
              >
                Unit Available
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 4. Key Icons Row */}
        <Box
          sx={{
            px: 2,
            pb: 1,
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-start',
          }}
        >
          {keyIcons.map((item, idx) => (
            <KeyIconItem key={idx} {...item} />
          ))}
        </Box>

        {/* 5. Section Tabs */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Divider */}
        <Divider sx={{ mx: 2 }} />

        {/* 6. Content Sections */}
        <Box sx={{ pb: 2 }}>
          {/* Unit Description */}
          <UnitDescription />

          <Divider sx={{ mx: 2 }} />

          {/* Media & Tours */}
          <MediaAndTour />

          <Divider sx={{ mx: 2 }} />

          {/* Specifications */}
          <Specifications />

          <Divider sx={{ mx: 2 }} />

          {/* Facilities */}
          <Facilities />

          <Divider sx={{ mx: 2 }} />

          {/* Suited For */}
          <SuitedFor />

          <Divider sx={{ mx: 2 }} />

          {/* Investment Summary */}
          <InvestmentSummary />
        </Box>
      </Box>

      {/* Sticky Footer */}
      <Footer />
    </Box>
  );
};

export default ViewAll;
