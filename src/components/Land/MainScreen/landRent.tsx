import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import TerrainIcon from '@mui/icons-material/Terrain';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StraightenIcon from '@mui/icons-material/Straighten';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface LandRentProps {
  onViewAll?: () => void;
}

interface LandCardData {
  name: string;
  tag: string;
  tagIcon: React.ReactNode;
  image: string;
  location: string;
  area: string;
  price: string;
  priceLabel: string;
  imageCount?: string;
  justViewed?: boolean;
  roadAccess?: string;
}

const featuredLand: LandCardData = {
  name: 'Plot GV-101',
  tag: 'Commercial',
  tagIcon: <TerrainIcon sx={{ fontSize: 12, color: 'var(--text-inverse)' }} />,
  image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
  location: 'Sector 12, Green Valley',
  area: '2.5 Acres',
  price: '₹ 2.5 Lakh',
  priceLabel: 'Rent/Month',
  roadAccess: 'Main Road',
};

const landCards: LandCardData[] = [
  {
    name: 'Plot GV-205',
    tag: 'Residential',
    tagIcon: <TerrainIcon sx={{ fontSize: 12, color: 'var(--text-inverse)' }} />,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
    location: 'Sector 15, Green Valley',
    area: '1.2 Acres',
    price: '₹ 1.8 Lakh',
    priceLabel: 'Rent/Month',
    imageCount: '1/6',
    justViewed: true,
  },
  {
    name: 'Plot GV-308',
    tag: 'Industrial',
    tagIcon: <TerrainIcon sx={{ fontSize: 12, color: 'var(--text-inverse)' }} />,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80',
    location: 'Sector 8, Green Valley',
    area: '5.0 Acres',
    price: '₹ 4.2 Lakh',
    priceLabel: 'Rent/Month',
    imageCount: '1/6',
  },
];

const FeaturedCard: React.FC<{ land: LandCardData; onViewAll?: () => void }> = ({ land, onViewAll }) => (
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
          {land.name}
        </Typography>
        <Typography
          sx={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}
        >
          {land.location} | {land.area}
        </Typography>

        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '4px',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-app)',
          }}
        >
          <Box
            sx={{
              width: '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: 'var(--accent-gold)',
            }}
          />
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-main)' }}>
            {land.roadAccess}
          </Typography>
        </Box>

        <Stack direction="row" spacing="8px" sx={{ marginTop: '8px' }}>
          <Box sx={{ padding: '4px' }}>
            <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{land.priceLabel}:</Typography>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {land.price}
            </Typography>
          </Box>
          <Box sx={{ padding: '4px' }}>
            <Stack direction="row" alignItems="center" spacing="4px">
              <Typography component="span" sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                High Demand
              </Typography>
              <TrendingUpIcon sx={{ fontSize: 12, color: 'var(--accent-gold)' }} />
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          width: 100,
          borderRadius: '4px',
          overflow: 'hidden',
          flexShrink: 0,
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Box
          component="img"
          src={land.image}
          alt={land.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Stack>

    <Box
      onClick={onViewAll}
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
);

const LandCard: React.FC<{ land: LandCardData; onViewAll?: () => void }> = ({ land, onViewAll }) => (
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
    <Box sx={{ position: 'relative', height: 110, backgroundColor: 'var(--bg-app)' }}>
      <Box
        component="img"
        src={land.image}
        alt={land.name}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {land.justViewed && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(15, 26, 44, 0.85) 0%, transparent 70%)',
          }}
        >
          <Typography
            sx={{
              position: 'absolute',
              top: '4px',
              left: '4px',
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
              fontStyle: 'italic',
            }}
          >
            Just Viewed
          </Typography>
        </Box>
      )}

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
        {land.tagIcon}
        <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-inverse)' }}>
          {land.tag}
        </Typography>
      </Box>

      {land.imageCount && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            padding: '2px 4px',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-header)',
          }}
        >
          <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-inverse)', fontWeight: 600 }}>
            {land.imageCount}
          </Typography>
        </Box>
      )}
    </Box>

    <Box sx={{ padding: '4px' }}>
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
        {land.name}
      </Typography>
      <Stack direction="row" alignItems="center" spacing="4px" sx={{ marginTop: '4px' }}>
        <LocationOnIcon sx={{ fontSize: 12, color: 'var(--text-muted)' }} />
        <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          {land.location}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing="4px" sx={{ marginTop: '2px' }}>
        <StraightenIcon sx={{ fontSize: 12, color: 'var(--text-muted)' }} />
        <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          {land.area}
        </Typography>
      </Stack>

      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
        {land.price}
      </Typography>
      <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
        {land.priceLabel}
      </Typography>

      <Box
        onClick={onViewAll}
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

const LandRent: React.FC<LandRentProps> = ({ onViewAll }) => {
  return (
    <Stack spacing="4px" sx={{ padding: '4px' }}>
      <FeaturedCard land={featuredLand} onViewAll={onViewAll} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px',
        }}
      >
        {landCards.map((land, idx) => (
          <LandCard key={idx} land={land} onViewAll={onViewAll} />
        ))}
      </Box>
    </Stack>
  );
};

export default LandRent;
