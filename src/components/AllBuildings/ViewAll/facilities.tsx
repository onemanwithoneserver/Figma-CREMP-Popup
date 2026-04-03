import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BoltIcon from '@mui/icons-material/Bolt';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ShieldIcon from '@mui/icons-material/Shield';
import DomainIcon from '@mui/icons-material/Domain';
import DoneIcon from '@mui/icons-material/Done';

interface FacilityCategory {
  id: FacilityTab;
  title: string;
  icon: React.ReactNode;
  items: { label: string; value: string | boolean }[];
}

type FacilityTab = 'parking' | 'power' | 'water' | 'safety' | 'buildingAmenities';

const facilityCategories: FacilityCategory[] = [
  {
    id: 'parking',
    title: 'Parking',
    icon: <LocalParkingIcon sx={{ fontSize: 16 }} />,
    items: [
      { label: 'Dedicated Parking', value: 'Yes' },
      { label: 'Number of Slots', value: '4' },
      { label: 'Visitor Parking', value: 'Yes' },
    ],
  },
  {
    id: 'power',
    title: 'Power',
    icon: <BoltIcon sx={{ fontSize: 16 }} />,
    items: [
      { label: 'Power Backup', value: 'Yes' },
      { label: 'Power Load', value: '15 kW' },
      { label: 'Power Phase', value: '3 Phase' },
    ],
  },
  {
    id: 'water',
    title: 'Water',
    icon: <WaterDropIcon sx={{ fontSize: 16 }} />,
    items: [
      { label: 'Water Connection', value: 'Yes' },
      { label: '24/7 Availability', value: 'Yes' },
    ],
  },
  {
    id: 'safety',
    title: 'Safety',
    icon: <ShieldIcon sx={{ fontSize: 16 }} />,
    items: [
      { label: 'Fire Sprinklers', value: 'Yes' },
      { label: 'Fire Extinguishers', value: 'Yes' },
    ],
  },
  {
    id: 'buildingAmenities',
    title: 'Building Amenities',
    icon: <DomainIcon sx={{ fontSize: 16 }} />,
    items: [
      { label: 'Lift', value: 'Yes' },
      { label: 'Security', value: 'Yes' },
      { label: 'CCTV', value: 'Yes' },
      { label: 'Maintenance Staff', value: 'Yes' },
    ],
  },
];

const Facilities: React.FC = () => {
  const [tabValue, setTabValue] = useState<FacilityTab>('parking');
  const activeCategory = facilityCategories.find((category) => category.id === tabValue) ?? facilityCategories[0];

  return (
    <Box sx={{ padding: '4px', textAlign: 'left' }}>
      <Typography
        sx={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-main)',
          marginBottom: '6px',
        }}
      >
        Building Facilities
      </Typography>

      <Box sx={{ mb: '8px' }}>
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {facilityCategories.map((category) => {
            const isActive = category.id === tabValue;
            return (
              <Box
                key={category.id}
                onClick={() => setTabValue(category.id)}
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
                {category.title}
              </Box>
            );
          })}
        </Stack>
      </Box>

      {activeCategory && (
        <Box
          sx={{
            padding: '8px 4px', // Slightly increased top padding for breathing room since the header is gone
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            backgroundColor: 'var(--bg-card)',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
            transition: 'all 150ms ease-in-out',
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {activeCategory.items.map((item, i) => (
              <Box key={i} sx={{ width: 'calc(50% - 2px)' }}>
                <Stack direction="row" alignItems="flex-start" spacing="4px">
                  {item.value === 'Yes' ? (
                    <DoneIcon sx={{ fontSize: 12, color: '#1C2A44', marginTop: '2px' }} />
                  ) : (
                    <Box sx={{ width: 12, height: 12, display: 'inline-block' }} />
                  )}
                  <Box>
                    <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                      {item.label}
                    </Typography>
                    {item.value !== 'Yes' && item.value !== 'No' && (
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {item.value}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Facilities;