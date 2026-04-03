import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface PotentialUse {
  icon: React.ReactNode;
  title: string;
  description: string;
  suitability: 'High' | 'Medium' | 'Low';
}

interface GrowthMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
}

const potentialUses: PotentialUse[] = [
  {
    icon: <ApartmentIcon sx={{ fontSize: 20 }} />,
    title: 'Residential Complex',
    description: 'Suitable for apartments/villas with 2.5 FSI',
    suitability: 'High',
  },
  {
    icon: <BusinessIcon sx={{ fontSize: 20 }} />,
    title: 'Commercial Plaza',
    description: 'Retail + Office space development',
    suitability: 'High',
  },
  {
    icon: <WarehouseIcon sx={{ fontSize: 20 }} />,
    title: 'Warehouse/Storage',
    description: 'Logistics hub potential with road access',
    suitability: 'Medium',
  },
  {
    icon: <StorefrontIcon sx={{ fontSize: 20 }} />,
    title: 'Retail Center',
    description: 'Neighborhood shopping complex',
    suitability: 'Medium',
  },
];

const growthMetrics: GrowthMetric[] = [
  { label: 'Area Appreciation', value: '12%', trend: 'up' },
  { label: 'Rental Demand', value: 'High', trend: 'up' },
  { label: 'Infrastructure', value: 'Growing', trend: 'up' },
];

const LandPotential: React.FC = () => {
  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'High':
        return '#10B981';
      case 'Medium':
        return '#F59E0B';
      case 'Low':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

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
          Development Potential
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            marginBottom: '12px',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {growthMetrics.map((metric, idx) => (
            <Box
              key={idx}
              sx={{
                minWidth: 90,
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-app)',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {metric.value}
              </Typography>
              <Typography sx={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                {metric.label}
              </Typography>
              {metric.trend === 'up' && (
                <TrendingUpIcon sx={{ fontSize: 12, color: '#10B981', marginTop: '2px' }} />
              )}
            </Box>
          ))}
        </Box>

        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            marginBottom: '6px',
            paddingLeft: '4px',
          }}
        >
          Potential Uses
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {potentialUses.map((use, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-default)',
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  flexShrink: 0,
                }}
              >
                {use.icon}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {use.title}
                </Typography>
                <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {use.description}
                </Typography>
              </Box>

              <Box
                sx={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: getSuitabilityColor(use.suitability) + '20',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: getSuitabilityColor(use.suitability),
                  }}
                >
                  {use.suitability}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            marginTop: '12px',
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-app)',
            borderLeft: '3px solid var(--accent-gold)',
          }}
        >
          <Stack direction="row" alignItems="center" spacing="8px">
            <AssessmentIcon sx={{ fontSize: 18, color: 'var(--accent-gold)' }} />
            <Box>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Expert Assessment
              </Typography>
              <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                Commercial development recommended. High ROI potential within 5 years.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default LandPotential;
