import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StraightenIcon from '@mui/icons-material/Straighten';
import LayersIcon from '@mui/icons-material/Layers';
import HeightIcon from '@mui/icons-material/Height';
import ExploreIcon from '@mui/icons-material/Explore';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import SignpostIcon from '@mui/icons-material/Signpost';
import PremiumTabs, { type PremiumTabOption } from '../../ui/PremiumTabs';

interface DescriptionItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface DescriptionGroup {
  id: DescriptionTab;
  title: string;
  items: DescriptionItem[];
}

type DescriptionTab = 'basicInfo' | 'dimensions' | 'context';

const descriptionGroups: DescriptionGroup[] = [
  {
    id: 'basicInfo',
    title: 'Basic Info',
    items: [
      { icon: <SquareFootIcon sx={{ fontSize: 16 }} />, label: 'Carpet Area', value: '1,200 sq.ft' },
      { icon: <StraightenIcon sx={{ fontSize: 16 }} />, label: 'Built-up Area', value: '1,500 sq.ft' },
      { icon: <LayersIcon sx={{ fontSize: 16 }} />, label: 'Floor', value: 'Ground / 15' },
      { icon: <ExploreIcon sx={{ fontSize: 16 }} />, label: 'Unit Facing', value: 'North-East' },
    ],
  },
  {
    id: 'dimensions',
    title: 'Dimensions',
    items: [
      { icon: <AspectRatioIcon sx={{ fontSize: 16 }} />, label: 'L x B', value: '40ft x 30ft' },
      { icon: <StraightenIcon sx={{ fontSize: 16 }} />, label: 'Frontage', value: '24 Feet' },
      { icon: <HeightIcon sx={{ fontSize: 16 }} />, label: 'Ceiling Height', value: '14 Feet' },
      { icon: <DashboardCustomizeIcon sx={{ fontSize: 16 }} />, label: 'Corner Unit', value: 'Yes' },
    ],
  },
  {
    id: 'context',
    title: 'Context',
    items: [
      { icon: <VisibilityIcon sx={{ fontSize: 16 }} />, label: 'Road Visibility', value: 'Main Road' },
      { icon: <LocationCityIcon sx={{ fontSize: 16 }} />, label: 'Zone', value: 'Commercial PD' },
      { icon: <SignpostIcon sx={{ fontSize: 16 }} />, label: 'Colony/Layout', value: 'Sector 50' },
      { icon: <MapIcon sx={{ fontSize: 16 }} />, label: 'Map Location', value: 'View Map' },
    ],
  },
];

const DescriptionCard: React.FC<{ item: DescriptionItem }> = ({ item }) => (
  <Box
    sx={{
      backgroundColor: 'var(--bg-app)',
      borderRadius: '4px',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'all 150ms ease-in-out',
      border: '1px solid transparent',
      '&:hover': {
        borderColor: 'var(--accent-gold)',
        backgroundColor: 'var(--bg-card)',
      }
    }}
  >
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '4px',
        backgroundColor: 'var(--bg-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-gold)',
        flexShrink: 0,
        boxShadow: '0px 1px 2px rgba(0,0,0,0.02)',
      }}
    >
      {item.icon}
    </Box>
    <Stack spacing={0}>
      <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
        {item.label}
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
        {item.value}
      </Typography>
    </Stack>
  </Box>
);

const UnitDescription: React.FC = () => {
  const [tabValue, setTabValue] = React.useState<DescriptionTab>('basicInfo');

  const descriptionTabs: PremiumTabOption<DescriptionTab>[] = descriptionGroups.map((group) => ({
    label: group.title,
    value: group.id,
  }));

  const activeGroup = descriptionGroups.find((group) => group.id === tabValue) ?? descriptionGroups[0];

  return (
    <Box sx={{ padding: '4px', textAlign: 'left' }}>
      <Box
        sx={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '4px',
          border: '1px solid var(--border-default)',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
          padding: '4px',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            marginBottom: '4px',
            paddingLeft: '4px',
          }}
        >
          Unit description
        </Typography>

        <Box sx={{ mb: '4px' }}>
          <PremiumTabs tabs={descriptionTabs} value={tabValue} onChange={setTabValue} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4px',
          }}
        >
          {activeGroup.items.map((item, idx) => (
            <DescriptionCard key={idx} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UnitDescription;