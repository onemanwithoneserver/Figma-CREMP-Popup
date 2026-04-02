import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StraightenIcon from '@mui/icons-material/Straighten';
import LayersIcon from '@mui/icons-material/Layers';
import HeightIcon from '@mui/icons-material/Height';

interface DescriptionItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const descriptionItems: DescriptionItem[] = [
  {
    icon: <SquareFootIcon sx={{ fontSize: 18, color: '#c8a45a' }} />,
    label: 'Carpet area',
    value: '1,200 sq.ft',
  },
  {
    icon: <StraightenIcon sx={{ fontSize: 18, color: '#c8a45a' }} />,
    label: 'Frontage',
    value: '24 Feet',
  },
  {
    icon: <LayersIcon sx={{ fontSize: 18, color: '#c8a45a' }} />,
    label: 'Floor',
    value: 'Ground',
  },
  {
    icon: <HeightIcon sx={{ fontSize: 18, color: '#c8a45a' }} />,
    label: 'Ceiling height',
    value: '14 Feet',
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1,
        }}
      >
        {descriptionItems.map((item, idx) => (
          <DescriptionCard key={idx} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default UnitDescription;
