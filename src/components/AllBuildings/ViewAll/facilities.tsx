import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SecurityIcon from '@mui/icons-material/Security';
import BoltIcon from '@mui/icons-material/Bolt';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

interface FacilityItem {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const facilities: FacilityItem[] = [
  {
    icon: <LocalParkingIcon sx={{ fontSize: 22 }} />,
    label: 'Parking',
    color: '#1a237e',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 22 }} />,
    label: 'Security',
    color: '#1a237e',
  },
  {
    icon: <BoltIcon sx={{ fontSize: 22 }} />,
    label: 'Power',
    color: '#1a237e',
  },
  {
    icon: <WaterDropIcon sx={{ fontSize: 22 }} />,
    label: 'Water',
    color: '#1a237e',
  },
];

const Facilities: React.FC = () => {
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
        Facilities
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: 1,
        }}
      >
        {facilities.map((facility, idx) => (
          <Stack key={idx} alignItems="center" spacing={0.75}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '14px',
                backgroundColor: '#f0f2ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: facility.color,
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {facility.icon}
            </Box>
            <Typography sx={{ fontSize: '11px', color: '#666', fontWeight: 500 }}>
              {facility.label}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default Facilities;
