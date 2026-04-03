import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

interface FooterAction {
  icon: React.ReactNode;
  label: string;
}

const footerActions: FooterAction[] = [
  {
    icon: <ShareIcon sx={{ fontSize: 16, color: 'inherit' }} />,
    label: 'Share',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 16, color: 'inherit' }} />,
    label: 'Contact',
  },
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 16, color: 'inherit' }} />,
    label: 'Site Visit',
  },
  {
    icon: <BookmarkBorderIcon sx={{ fontSize: 16, color: 'inherit' }} />,
    label: 'Save',
  },
];

const LandFooter: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-default)',
        padding: '4px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 10,
        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.04)',
      }}
    >
      {footerActions.map((action, idx) => (
        <Stack
          key={idx}
          alignItems="center"
          spacing="4px"
          sx={{
            cursor: 'pointer',
            flex: 1,
            padding: '4px',
            borderRadius: '4px',
            color: 'var(--text-main)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {action.icon}
          </Box>
          <Typography
            sx={{
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'inherit',
              transition: 'color 150ms ease-in-out',
            }}
          >
            {action.label}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default LandFooter;
