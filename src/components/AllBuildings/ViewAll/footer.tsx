import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

interface FooterAction {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const footerActions: FooterAction[] = [
  {
    icon: <ShareIcon sx={{ fontSize: 20 }} />,
    label: 'Share',
    color: '#1a237e',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 20 }} />,
    label: 'Contact',
    color: '#1a237e',
  },
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 20 }} />,
    label: 'Schedule Visit',
    color: '#1a237e',
  },
  {
    icon: <BookmarkBorderIcon sx={{ fontSize: 20 }} />,
    label: 'Save',
    color: '#1a237e',
  },
];

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #e0e0e0',
        px: 1,
        py: 1,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 10,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.06)',
      }}
    >
      {footerActions.map((action, idx) => (
        <Stack
          key={idx}
          alignItems="center"
          spacing={0.25}
          sx={{
            cursor: 'pointer',
            flex: 1,
            py: 0.5,
            borderRadius: '8px',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <Box sx={{ color: action.color }}>
            {action.icon}
          </Box>
          <Typography
            sx={{
              fontSize: '10px',
              fontWeight: 500,
              color: action.color,
            }}
          >
            {action.label}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default Footer;
