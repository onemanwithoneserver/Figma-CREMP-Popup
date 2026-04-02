import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BoltIcon from '@mui/icons-material/Bolt';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ShieldIcon from '@mui/icons-material/Shield';
import DomainIcon from '@mui/icons-material/Domain';
import DoneIcon from '@mui/icons-material/Done';

interface FacilityCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  items: { label: string; value: string | boolean }[];
}

const facilityCategories: FacilityCategory[] = [
  {
    title: 'Parking',
    icon: <LocalParkingIcon sx={{ fontSize: 20 }} />,
    color: '#e3f2fd', // light blue
    items: [
      { label: 'Dedicated Parking', value: 'Yes' },
      { label: 'Number of Slots', value: '4' },
      { label: 'Visitor Parking', value: 'Yes' },
    ],
  },
  {
    title: 'Power',
    icon: <BoltIcon sx={{ fontSize: 20 }} />,
    color: '#fff3e0', // light orange
    items: [
      { label: 'Power Backup', value: 'Yes' },
      { label: 'Power Load', value: '15 kW' },
      { label: 'Power Phase', value: '3 Phase' },
    ],
  },
  {
    title: 'Water',
    icon: <WaterDropIcon sx={{ fontSize: 20 }} />,
    color: '#e0f7fa', // light cyan
    items: [
      { label: 'Water Connection', value: 'Yes' },
      { label: '24/7 Availability', value: 'Yes' },
    ],
  },
  {
    title: 'Safety',
    icon: <ShieldIcon sx={{ fontSize: 20 }} />,
    color: '#fce4ec', // light pink
    items: [
      { label: 'Fire Sprinklers', value: 'Yes' },
      { label: 'Fire Extinguishers', value: 'Yes' },
    ],
  },
  {
    title: 'Building Amenities',
    icon: <DomainIcon sx={{ fontSize: 20 }} />,
    color: '#e8f5e9', // light green
    items: [
      { label: 'Lift', value: 'Yes' },
      { label: 'Security', value: 'Yes' },
      { label: 'CCTV', value: 'Yes' },
      { label: 'Maintenance Staff', value: 'Yes' },
    ],
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
        Building Facilities
      </Typography>
      <Stack spacing={2}>
        {facilityCategories.map((category, idx) => (
          <Box
            key={idx}
            sx={{
              p: 1.5,
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  backgroundColor: category.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1a237e',
                }}
              >
                {category.icon}
              </Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>
                {category.title}
              </Typography>
            </Stack>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {category.items.map((item, i) => (
                <Box key={i} sx={{ width: 'calc(50% - 4px)' }}>
                  <Stack direction="row" alignItems="flex-start" spacing={0.5}>
                    {item.value === 'Yes' ? (
                      <DoneIcon sx={{ fontSize: 14, color: '#4caf50', mt: 0.2 }} />
                    ) : (
                      <Box sx={{ width: 14, height: 14, display: 'inline-block' }} />
                    )}
                    <Box>
                      <Typography sx={{ fontSize: '11px', color: '#666', lineHeight: 1.2 }}>
                        {item.label}
                      </Typography>
                      {item.value !== 'Yes' && item.value !== 'No' && (
                        <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#111' }}>
                          {item.value}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Facilities;
