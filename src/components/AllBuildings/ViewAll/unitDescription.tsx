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

interface DescriptionItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface DescriptionGroup {
  title: string;
  items: DescriptionItem[];
}

const descriptionGroups: DescriptionGroup[] = [
  {
    title: 'Basic Info',
    items: [
      { icon: <SquareFootIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Carpet Area', value: '1,200 sq.ft' },
      { icon: <StraightenIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Built-up Area', value: '1,500 sq.ft' },
      { icon: <LayersIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Floor', value: 'Ground / 15' },
      { icon: <ExploreIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Unit Facing', value: 'North-East' },
    ],
  },
  {
    title: 'Dimensions & Layout',
    items: [
      { icon: <AspectRatioIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'L x B', value: '40ft x 30ft' },
      { icon: <StraightenIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Frontage', value: '24 Feet' },
      { icon: <HeightIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Ceiling Height', value: '14 Feet' },
      { icon: <DashboardCustomizeIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Corner Unit', value: 'Yes' },
    ],
  },
  {
    title: 'Location Context',
    items: [
      { icon: <VisibilityIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Road Visibility', value: 'Main Road' },
      { icon: <LocationCityIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Zone', value: 'Commercial PD' },
      { icon: <SignpostIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Colony/Layout', value: 'Sector 50' },
      { icon: <MapIcon sx={{ fontSize: 18, color: '#c8a45a' }} />, label: 'Map Location', value: 'View Map' },
    ],
  },
];

const DescriptionCard: React.FC<{ item: DescriptionItem }> = ({ item }) => (
  <Box
    sx={{
      backgroundColor: '#f8f9fb',
      borderRadius: '10px',
      p: 1.5,
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
    }}
  >
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '8px',
        backgroundColor: '#fdf6e3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {item.icon}
    </Box>
    <Stack spacing={0}>
      <Typography sx={{ fontSize: '11px', color: '#888', lineHeight: 1.3 }}>
        {item.label}
      </Typography>
      <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1a237e', lineHeight: 1.3 }}>
        {item.value}
      </Typography>
    </Stack>
  </Box>
);

const UnitDescription: React.FC = () => {
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
        Unit description
      </Typography>

      <Stack spacing={2}>
        {descriptionGroups.map((group, groupIdx) => (
          <Box key={groupIdx}>
            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#555', mb: 1 }}>
              {group.title}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1,
              }}
            >
              {group.items.map((item, idx) => (
                <DescriptionCard key={idx} item={item} />
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default UnitDescription;
