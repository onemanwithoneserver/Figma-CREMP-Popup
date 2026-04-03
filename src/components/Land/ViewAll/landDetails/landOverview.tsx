import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StraightenIcon from '@mui/icons-material/Straighten';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import TerrainIcon from '@mui/icons-material/Terrain';
import WaterIcon from '@mui/icons-material/Water';
import PowerIcon from '@mui/icons-material/Power';

interface OverviewItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface OverviewGroup {
  id: OverviewTab;
  title: string;
  items: OverviewItem[];
}

type OverviewTab = 'plotInfo' | 'utilities' | 'surroundings';

const overviewGroups: OverviewGroup[] = [
  {
    id: 'plotInfo',
    title: 'Plot Info',
    items: [
      { icon: <SquareFootIcon sx={{ fontSize: 16 }} />, label: 'Total Area', value: '2.5 Acres' },
      { icon: <StraightenIcon sx={{ fontSize: 16 }} />, label: 'Dimensions', value: '200 x 545 ft' },
      { icon: <FormatShapesIcon sx={{ fontSize: 16 }} />, label: 'Shape', value: 'Rectangular' },
      { icon: <TerrainIcon sx={{ fontSize: 16 }} />, label: 'Topography', value: 'Level Plain' },
    ],
  },
  {
    id: 'utilities',
    title: 'Utilities',
    items: [
      { icon: <WaterIcon sx={{ fontSize: 16 }} />, label: 'Water', value: 'Available' },
      { icon: <PowerIcon sx={{ fontSize: 16 }} />, label: 'Electricity', value: 'Available' },
      { icon: <TerrainIcon sx={{ fontSize: 16 }} />, label: 'Road Access', value: 'Paved' },
      { icon: <StraightenIcon sx={{ fontSize: 16 }} />, label: 'Frontage', value: '200 ft' },
    ],
  },
  {
    id: 'surroundings',
    title: 'Surroundings',
    items: [
      { icon: <TerrainIcon sx={{ fontSize: 16 }} />, label: 'Neighborhood', value: 'Developing' },
      { icon: <StraightenIcon sx={{ fontSize: 16 }} />, label: 'Distance to City', value: '8 km' },
      { icon: <FormatShapesIcon sx={{ fontSize: 16 }} />, label: 'Near Highway', value: 'Yes' },
      { icon: <TerrainIcon sx={{ fontSize: 16 }} />, label: 'Public Transport', value: 'Nearby' },
    ],
  },
];

const OverviewCard: React.FC<{ item: OverviewItem }> = ({ item }) => (
  <Box
    sx={{
      backgroundColor: 'var(--bg-app)',
      borderRadius: '4px',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      border: '1px solid var(--border-default)',
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
        color: '#1C2A44',
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

const LandOverview: React.FC = () => {
  const [tabValue, setTabValue] = React.useState<OverviewTab>('plotInfo');

  const activeGroup = overviewGroups.find((group) => group.id === tabValue) ?? overviewGroups[0];

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
            marginBottom: '6px',
            paddingLeft: '4px',
          }}
        >
          Plot Overview
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: '8px',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {overviewGroups.map((group) => {
            const isActive = group.id === tabValue;
            return (
              <Box
                key={group.id}
                onClick={() => setTabValue(group.id)}
                sx={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: isActive ? 'linear-gradient(to bottom right, #1C2A44, #154eb1)' : '#F3F4F6',
                  color: isActive ? '#FFFFFF' : '#4B5563',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                {group.title}
              </Box>
            );
          })}
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4px',
          }}
        >
          {activeGroup.items.map((item, idx) => (
            <OverviewCard key={idx} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LandOverview;
