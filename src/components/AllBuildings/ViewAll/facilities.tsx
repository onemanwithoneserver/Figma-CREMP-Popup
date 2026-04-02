import React, { useState } from 'react';
import { Box, Typography, Stack, Tabs, Tab } from '@mui/material';
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
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const activeCategory = facilityCategories[tabValue];

  return (
    <Box sx={{ px: 2, py: 2, textAlign: 'left' }}>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#1a237e',
          mb: 2,
        }}
      >
        Building Facilities
      </Typography>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{ 
          minHeight: '36px',
          mb: 3,
          borderBottom: '1px solid #eee',
          '& .MuiTab-root': {
            minHeight: '36px',
            textTransform: 'none',
            fontSize: '13px',
            fontWeight: 600,
            py: 1,
            px: 2,
            color: '#555',
          },
          '& .Mui-selected': {
            color: '#1a237e',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#1a237e',
            borderRadius: '4px 4px 0 0',
          }
        }}
      >
        {facilityCategories.map((category, idx) => (
          <Tab key={idx} label={category.title} />
        ))}
      </Tabs>

      {activeCategory && (
        <Box
          sx={{
            p: 2,
            borderRadius: '4px',
            border: '1px solid #f0f0f0',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '4px',
                backgroundColor: activeCategory.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1a237e',
              }}
            >
              {activeCategory.icon}
            </Box>
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>
              {activeCategory.title}
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {activeCategory.items.map((item, i) => (
              <Box key={i} sx={{ width: 'calc(50% - 8px)' }}>
                <Stack direction="row" alignItems="flex-start" spacing={1}>
                  {item.value === 'Yes' ? (
                    <DoneIcon sx={{ fontSize: 16, color: '#4caf50', mt: 0.2 }} />
                  ) : (
                    <Box sx={{ width: 16, height: 16, display: 'inline-block' }} />
                  )}
                  <Box>
                    <Typography sx={{ fontSize: '11px', color: '#666', lineHeight: 1.2 }}>
                      {item.label}
                    </Typography>
                    {item.value !== 'Yes' && item.value !== 'No' && (
                      <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>
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
