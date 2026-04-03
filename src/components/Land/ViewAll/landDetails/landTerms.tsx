import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

interface TermItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
}

const rentTerms: TermItem[] = [
  { icon: <AttachMoneyIcon sx={{ fontSize: 16 }} />, label: 'Monthly Rent', value: '₹ 2.5 Lakhs', subtext: 'Negotiable' },
  { icon: <SecurityIcon sx={{ fontSize: 16 }} />, label: 'Security Deposit', value: '6 Months', subtext: '₹ 15 Lakhs' },
  { icon: <CalendarTodayIcon sx={{ fontSize: 16 }} />, label: 'Min. Lease Term', value: '3 Years', subtext: 'Renewable' },
  { icon: <HandshakeIcon sx={{ fontSize: 16 }} />, label: 'Escalation', value: '5% / Year', subtext: 'After 3 years' },
];

const leaseTerms: TermItem[] = [
  { icon: <AttachMoneyIcon sx={{ fontSize: 16 }} />, label: 'Lease Premium', value: '₹ 50 Lakhs', subtext: 'One-time' },
  { icon: <CalendarTodayIcon sx={{ fontSize: 16 }} />, label: 'Lease Duration', value: '10 Years', subtext: 'Extendable' },
  { icon: <AttachMoneyIcon sx={{ fontSize: 16 }} />, label: 'Annual Lease Rent', value: '₹ 5 Lakhs', subtext: 'Yearly' },
  { icon: <DescriptionIcon sx={{ fontSize: 16 }} />, label: 'Usage Rights', value: 'Commercial', subtext: 'As per zoning' },
];

const conditions: string[] = [
  'Subject to verification of documents',
  'Brokerage: 1 month rent',
  'Maintenance charges extra',
  'GST applicable as per law',
];

const LandTerms: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'rent' | 'lease'>('rent');

  const activeTerms = activeTab === 'rent' ? rentTerms : leaseTerms;

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
          Terms & Conditions
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: '8px',
          }}
        >
          {['rent', 'lease'].map((tab) => {
            const isActive = tab === activeTab;
            return (
              <Box
                key={tab}
                onClick={() => setActiveTab(tab as 'rent' | 'lease')}
                sx={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: isActive ? 'linear-gradient(to bottom right, #1C2A44, #154eb1)' : '#F3F4F6',
                  color: isActive ? '#FFFFFF' : '#4B5563',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'capitalize',
                  userSelect: 'none',
                }}
              >
                {tab} Terms
              </Box>
            );
          })}
        </Stack>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            marginBottom: '12px',
          }}
        >
          {activeTerms.map((term, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-app)',
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  flexShrink: 0,
                }}
              >
                {term.icon}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {term.label}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {term.value}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                }}
              >
                {term.subtext}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FCD34D',
          }}
        >
          <Stack direction="row" alignItems="center" spacing="4px" sx={{ marginBottom: '6px' }}>
            <InfoIcon sx={{ fontSize: 14, color: '#F59E0B' }} />
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400E' }}>
              Important Conditions
            </Typography>
          </Stack>

          <Box component="ul" sx={{ margin: 0, paddingLeft: '16px' }}>
            {conditions.map((condition, idx) => (
              <Box component="li" key={idx} sx={{ marginBottom: '2px' }}>
                <Typography sx={{ fontSize: '0.65rem', color: '#92400E' }}>
                  {condition}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: '12px',
            display: 'flex',
            gap: '4px',
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              backgroundColor: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 16, color: '#10B981' }} />
            <Box>
              <Typography sx={{ fontSize: '0.65rem', color: '#065F46' }}>
                Ready for
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#065F46' }}>
                Immediate
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              backgroundColor: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <DescriptionIcon sx={{ fontSize: 16, color: '#3B82F6' }} />
            <Box>
              <Typography sx={{ fontSize: '0.65rem', color: '#1E40AF' }}>
                Documents
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E40AF' }}>
                Available
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandTerms;
