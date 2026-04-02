import React from 'react';
import { Box } from '@mui/material';
import PremiumTabs, { type PremiumTabOption } from '../../ui/PremiumTabs';

export type ViewAllTab = 'unitDetails' | 'media' | 'specs' | 'facilities' | 'suited';

interface TabNavigationProps {
  activeTab: ViewAllTab;
  onTabChange: (tab: ViewAllTab) => void;
}

const tabs: PremiumTabOption<ViewAllTab>[] = [
  { value: 'unitDetails', label: 'Unit details' },
  { value: 'media', label: 'Media' },
  { value: 'specs', label: 'Specs' },
  { value: 'facilities', label: 'Facilities' },
  { value: 'suited', label: 'Suited' },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <Box
      sx={{
        p: '4px',
        backgroundColor: 'var(--bg-card)',
      }}
    >
      <PremiumTabs tabs={tabs} value={activeTab} onChange={onTabChange} />
    </Box>
  );
};

export default TabNavigation;