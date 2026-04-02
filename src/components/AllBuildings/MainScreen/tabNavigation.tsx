import React from 'react';
import { Box } from '@mui/material';

import { CurvedTabs, type CurvedTabOption } from '../../ui/CurvedTabs';

type TabType = 'retail' | 'office' | 'coworking';

interface TabNavigationProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const curvedTabOptions: CurvedTabOption[] = [
  { label: 'Retail', value: 'retail' },
  { label: 'Office', value: 'office' },
  { label: 'Co-working', value: 'coworking' },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ selectedTab, onTabChange }) => {
  return (
    <Box
      sx={{
        px: 2,
        pb: 2,
        mt: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'auto',
        '&::-webkit-scrollbar': { display: 'none' }, // hide scrollbar
      }}
    >
      <CurvedTabs
        tabs={curvedTabOptions}
        activeTab={selectedTab}
        onChange={(val) => onTabChange(val as TabType)}
      />
    </Box>
  );
};

export default TabNavigation;
