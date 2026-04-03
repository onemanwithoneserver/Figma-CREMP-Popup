import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TerrainIcon from '@mui/icons-material/Terrain';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <TerrainIcon sx={{ fontSize: 16, color: 'var(--accent-gold)' }} />,
    value: '18',
    label: 'Plots',
  },
  {
    icon: <SquareFootIcon sx={{ fontSize: 16, color: 'var(--accent-gold)' }} />,
    value: '45 Acres',
    label: 'Total Area',
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 16, color: 'var(--accent-gold)' }} />,
    value: '3',
    label: 'Locations',
  },
  {
    icon: <MapIcon sx={{ fontSize: 16, color: 'var(--accent-gold)' }} />,
    value: '5',
    label: 'Zones',
  },
];

const LandTopSection: React.FC = () => {
  return (
    <Box sx={{ padding: '4px' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 200,
          overflow: 'hidden',
          borderRadius: '4px',
          border: '1px solid var(--border-default)',
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
          alt="Land Property, Hyderabad"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: 32,
            height: 32,
            borderRadius: '4px',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px solid rgba(198, 156, 68, 0.4)',
            boxShadow: '0 2px 8px rgba(198, 156, 68, 0.15)',
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 16, color: 'var(--text-main)' }} />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(15, 26, 44, 0.85) 0%, transparent 100%)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            padding: '4px'
          }}
        >
          <Typography
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-inverse)',
              lineHeight: 1.2,
            }}
          >
            Green Valley Estates
          </Typography>
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: 'var(--text-inverse)',
              opacity: 0.8,
              marginTop: '2px',
            }}
          >
            Prime Development Land
          </Typography>
        </Box>
      </Box>

      <Box sx={{ paddingTop: '4px' }}>
        <Box
          sx={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '4px',
            border: '1px solid rgba(198, 156, 68, 0.18)',
            borderTop: '2px solid var(--accent-gold)',
            boxShadow: '0 4px 16px rgba(28, 42, 68, 0.08), 0 0 0 1px rgba(198, 156, 68, 0.04)',
            padding: '8px 4px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {stats.map((stat, idx) => (
            <React.Fragment key={idx}>
              <Stack alignItems="center" spacing="4px" sx={{ flex: 1 }}>
                {stat.icon}
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.label}
                </Typography>
              </Stack>
              {idx < stats.length - 1 && (
                <Box
                  sx={{
                    width: '1px',
                    height: 32,
                    backgroundColor: 'var(--border-default)',
                    flexShrink: 0,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LandTopSection;
