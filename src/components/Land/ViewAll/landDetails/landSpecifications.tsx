import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import WaterIcon from '@mui/icons-material/Water';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LandscapeIcon from '@mui/icons-material/Landscape';

interface SpecItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  status?: 'positive' | 'negative' | 'neutral';
}

interface SpecGroup {
  id: SpecTab;
  title: string;
  items: SpecItem[];
}

type SpecTab = 'legal' | 'technical' | 'environmental';

const specGroups: SpecGroup[] = [
  {
    id: 'legal',
    title: 'Legal',
    items: [
      { icon: <GavelIcon sx={{ fontSize: 16 }} />, label: 'Title Clear', value: 'Yes', status: 'positive' },
      { icon: <AccountBalanceIcon sx={{ fontSize: 16 }} />, label: 'Litigation', value: 'None', status: 'positive' },
      { icon: <SecurityIcon sx={{ fontSize: 16 }} />, label: 'Encumbrance', value: 'Free', status: 'positive' },
      { icon: <CheckCircleIcon sx={{ fontSize: 16 }} />, label: 'RERA Reg.', value: 'Approved', status: 'positive' },
    ],
  },
  {
    id: 'technical',
    title: 'Technical',
    items: [
      { icon: <ArchitectureIcon sx={{ fontSize: 16 }} />, label: 'FSI Allowed', value: '2.5' },
      { icon: <HomeWorkIcon sx={{ fontSize: 16 }} />, label: 'Ground Coverage', value: '60%' },
      { icon: <LandscapeIcon sx={{ fontSize: 16 }} />, label: 'Height Limit', value: '45m' },
      { icon: <GavelIcon sx={{ fontSize: 16 }} />, label: 'Setback', value: '15m' },
    ],
  },
  {
    id: 'environmental',
    title: 'Environmental',
    items: [
      { icon: <LocalFloristIcon sx={{ fontSize: 16 }} />, label: 'Green Belt', value: 'Required', status: 'neutral' },
      { icon: <WaterIcon sx={{ fontSize: 16 }} />, label: 'Water Table', value: '40 ft', status: 'positive' },
      { icon: <FormatColorFillIcon sx={{ fontSize: 16 }} />, label: 'Soil Type', value: 'Rocky', status: 'neutral' },
      { icon: <WarningIcon sx={{ fontSize: 16 }} />, label: 'Flood Zone', value: 'No', status: 'positive' },
    ],
  },
];

const SpecCard: React.FC<{ item: SpecItem }> = ({ item }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'positive':
        return '#10B981';
      case 'negative':
        return '#EF4444';
      default:
        return '#1C2A44';
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'var(--bg-app)',
        borderRadius: '4px',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        border: '1px solid var(--border-default)',
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
          color: getStatusColor(item.status),
          flexShrink: 0,
          boxShadow: '0px 1px 2px rgba(0,0,0,0.02)',
        }}
      >
        {item.icon}
      </Box>
      <Stack spacing={0}>
        <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
          {item.label}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            lineHeight: 1.2,
            color: getStatusColor(item.status),
          }}
        >
          {item.value}
        </Typography>
      </Stack>
    </Box>
  );
};

const LandSpecifications: React.FC = () => {
  const [tabValue, setTabValue] = React.useState<SpecTab>('legal');

  const activeGroup = specGroups.find((group) => group.id === tabValue) ?? specGroups[0];

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
          Specifications
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: '8px',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {specGroups.map((group) => {
            const isActive = group.id === tabValue;
            return (
              <Box
                key={group.id}
                onClick={() => setTabValue(group.id)}
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
                {group.title}
              </Box>
            );
          })}
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4px',
          }}
        >
          {activeGroup.items.map((item, idx) => (
            <SpecCard key={idx} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LandSpecifications;
