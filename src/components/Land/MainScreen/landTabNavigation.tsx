import React from 'react';
import { Box } from '@mui/material';
import PremiumTabs, { type PremiumTabOption } from '../../ui/PremiumTabs';

type LandTabType = 'rent' | 'lease';

interface LandTabNavigationProps {
  selectedTab: LandTabType;
  onTabChange: (tab: LandTabType) => void;
}

const landTabOptions: PremiumTabOption<LandTabType>[] = [
  { label: 'Rent', value: 'rent' },
  { label: 'Lease', value: 'lease' },
];

const LandTabNavigation: React.FC<LandTabNavigationProps> = ({ selectedTab, onTabChange }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%' }}>
        <PremiumTabs
          tabs={landTabOptions}
          value={selectedTab}
          onChange={onTabChange}
        />
      </Box>
    </Box>
  );
};

export default LandTabNavigation;
