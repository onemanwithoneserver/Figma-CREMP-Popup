import React from 'react';
import { Box } from '@mui/material';
import PremiumTabs, { type PremiumTabOption } from '../../../ui/PremiumTabs';

export type SpecTab = 'readiness' | 'furnishing' | 'interiors';

interface SpecTabNavigationProps {
  activeTab: SpecTab;
  onTabChange: (tab: SpecTab) => void;
}

const specTabs: PremiumTabOption<SpecTab>[] = [
  { value: 'readiness', label: 'Readiness' },
  { value: 'furnishing', label: 'Furnishing' },
  { value: 'interiors', label: 'Interiors' },
];

const SpecTabNavigation: React.FC<SpecTabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <Box sx={{ mb: '4px' }}>
      <PremiumTabs tabs={specTabs} value={activeTab} onChange={onTabChange} />
    </Box>
  );
};

export default SpecTabNavigation;
