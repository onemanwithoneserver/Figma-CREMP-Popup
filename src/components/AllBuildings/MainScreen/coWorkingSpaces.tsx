import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const FeaturedCoWorking: React.FC = () => (
  <Box
    sx={{
      margin: '4px',
      padding: '4px',
      borderRadius: '6px',
      border: '1px solid rgba(198, 156, 68, 0.15)',
      borderTop: '2px solid var(--accent-gold)',
      boxShadow: '0 4px 20px rgba(28, 42, 68, 0.08), 0 1px 3px rgba(0,0,0,0.04)',
      backgroundColor: 'var(--bg-card)',
    }}
  >
    <Stack direction="row" sx={{ display: 'flex', alignItems: 'stretch' }}>
      <Box sx={{ flex: 1, padding: '4px' }}>
        <Typography
          sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}
        >
          Co-Work Hub 305
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          3rd Floor | 50 Seats
        </Typography>

        <Stack direction="row" spacing="4px" sx={{ marginTop: '4px' }}>
          <Stack direction="row" alignItems="center" spacing="4px">
            <WifiIcon sx={{ fontSize: 14, color: 'var(--accent-gold)' }} />
            <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>High-Speed</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="4px">
            <LocalCafeIcon sx={{ fontSize: 14, color: 'var(--accent-gold)' }} />
            <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Cafeteria</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="4px">
            <MeetingRoomIcon sx={{ fontSize: 14, color: 'var(--accent-gold)' }} />
            <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Meeting</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing="4px" sx={{ marginTop: '4px' }}>
          <Box sx={{ padding: '4px' }}>
            <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Per Seat:</Typography>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
              ₹ 8,500/mo
            </Typography>
          </Box>
          <Box sx={{ padding: '4px' }}>
            <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Full Floor:</Typography>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
              ₹ 3.5 Lakh/mo
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          width: 80,
          borderRadius: '4px',
          overflow: 'hidden',
          flexShrink: 0,
          backgroundColor: 'var(--bg-app)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <GroupsIcon sx={{ fontSize: 24, color: 'var(--accent-gold)' }} />
      </Box>
    </Stack>
  </Box>
);

interface CoWorkUnit {
  name: string;
  floor: string;
  seats: string;
  price: string;
  priceLabel: string;
}

const coWorkUnits: CoWorkUnit[] = [
  {
    name: 'Flex Desk Zone',
    floor: '4th Floor',
    seats: '30 Seats',
    price: '₹ 6,000/mo',
    priceLabel: 'Per Seat',
  },
  {
    name: 'Private Suite 601',
    floor: '6th Floor',
    seats: '10 Seats',
    price: '₹ 1.2 Lakh/mo',
    priceLabel: 'Full Suite',
  },
  {
    name: 'Hot Desk Area',
    floor: '2nd Floor',
    seats: '80 Seats',
    price: '₹ 4,500/mo',
    priceLabel: 'Per Seat',
  },
];

const CoWorkCard: React.FC<{ unit: CoWorkUnit }> = ({ unit }) => (
  <Box
    sx={{
      borderRadius: '6px',
      overflow: 'hidden',
      border: '1px solid rgba(198, 156, 68, 0.15)',
      borderTop: '2px solid var(--accent-gold)',
      boxShadow: '0 4px 20px rgba(28, 42, 68, 0.08), 0 1px 3px rgba(0,0,0,0.04)',
      backgroundColor: 'var(--bg-card)',
    }}
  >
    <Box
      sx={{
        height: 80,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=400&q=80"
        alt={unit.name}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '4px',
          left: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px',
          borderRadius: '4px',
          backgroundColor: 'var(--bg-header)',
        }}
      >
        <GroupsIcon sx={{ fontSize: 12, color: 'var(--text-inverse)' }} />
        <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-inverse)' }}>
          Co-Work
        </Typography>
      </Box>
    </Box>

    <Box sx={{ padding: '4px' }}>
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
        {unit.name}
      </Typography>
      <Stack direction="row" alignItems="center" spacing="4px" sx={{ marginTop: '4px' }}>
        <LocationOnIcon sx={{ fontSize: 12, color: 'var(--text-muted)' }} />
        <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          {unit.floor} | {unit.seats}
        </Typography>
      </Stack>

      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
        {unit.price}
      </Typography>
      <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
        {unit.priceLabel}
      </Typography>

      <Box
        sx={{
          marginTop: '4px',
          borderRadius: '4px',
          padding: '6px',
          background: 'linear-gradient(135deg, #B8902A 0%, #C9A84C 100%)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-inverse)' }}>
          View Details
        </Typography>
        <ArrowForwardIcon sx={{ fontSize: 12, color: 'var(--text-inverse)' }} />
      </Box>
    </Box>
  </Box>
);

const CoWorkingSpaces: React.FC = () => {
  return (
    <Stack spacing="4px" sx={{ padding: '4px' }}>
      <FeaturedCoWorking />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px',
        }}
      >
        {coWorkUnits.map((unit, idx) => (
          <CoWorkCard key={idx} unit={unit} />
        ))}
      </Box>
    </Stack>
  );
};

export default CoWorkingSpaces;