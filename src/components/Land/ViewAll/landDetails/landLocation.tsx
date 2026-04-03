import React from 'react';
import { Box, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface LocationItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  distance: string;
}

const nearbyPlaces: LocationItem[] = [
  { icon: <TrainIcon sx={{ fontSize: 16 }} />, label: 'Metro Station', value: 'Green Valley Metro', distance: '2.5 km' },
  { icon: <LocalAirportIcon sx={{ fontSize: 16 }} />, label: 'Airport', value: 'Rajiv Gandhi Intl', distance: '18 km' },
  { icon: <SchoolIcon sx={{ fontSize: 16 }} />, label: 'Schools', value: '5+ Institutions', distance: '3 km' },
  { icon: <LocalHospitalIcon sx={{ fontSize: 16 }} />, label: 'Hospital', value: 'Care Hospital', distance: '4 km' },
  { icon: <ShoppingCartIcon sx={{ fontSize: 16 }} />, label: 'Shopping', value: 'City Center Mall', distance: '5 km' },
  { icon: <DirectionsCarIcon sx={{ fontSize: 16 }} />, label: 'Highway', value: 'ORR Exit 15', distance: '1.5 km' },
];

const LandLocation: React.FC = () => {
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
          Location & Connectivity
        </Typography>

        {/* Nearby Places List */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {nearbyPlaces.map((place, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-app)',
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
                }}
              >
                {place.icon}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {place.value}
                </Typography>
                <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {place.label}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--accent-gold)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                {place.distance}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LandLocation;