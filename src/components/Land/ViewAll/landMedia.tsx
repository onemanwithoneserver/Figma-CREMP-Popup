import React from 'react';
import { Box, Typography } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideocamIcon from '@mui/icons-material/Videocam';
import MapIcon from '@mui/icons-material/Map';
import PanoramaIcon from '@mui/icons-material/Panorama';

const mediaItems = [
  {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80',
    alt: 'Land Plot View, Hyderabad',
    badge: { icon: <PhotoLibraryIcon sx={{ fontSize: 12, color: '#fff' }} />, label: '12 Photos', pos: 'top' as const },
  },
  {
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80',
    alt: 'Land Video Tour, Hyderabad',
    badge: { icon: <VideocamIcon sx={{ fontSize: 12, color: '#fff' }} />, label: 'Video Tour', pos: 'bottom' as const },
    centerIcon: <VideocamIcon sx={{ fontSize: 18, color: '#fff' }} />,
  },
  {
    src: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80',
    alt: 'Location Map, Hyderabad',
    badge: { icon: <MapIcon sx={{ fontSize: 12, color: '#fff' }} />, label: 'Location', pos: 'top' as const },
  },
  {
    src: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&q=80',
    alt: 'Drone View, Hyderabad',
    badge: { icon: <PanoramaIcon sx={{ fontSize: 12, color: '#fff' }} />, label: 'Drone View', pos: 'top' as const },
  },
];

const LandMedia: React.FC = () => {
  return (
    <Box sx={{ padding: '4px' }}>
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
          Media & Documents
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4px',
          }}
        >
          {mediaItems.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                position: 'relative',
                height: 100,
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-app)',
                cursor: 'pointer',
              }}
            >
              <Box
                component="img"
                src={item.src}
                alt={item.alt}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {item.centerIcon && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.centerIcon}
                </Box>
              )}
              <Box
                sx={{
                  position: 'absolute',
                  ...(item.badge.pos === 'top' ? { top: '4px' } : { bottom: '4px' }),
                  left: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                }}
              >
                {item.badge.icon}
                <Typography sx={{ fontSize: '0.65rem', color: '#fff', fontWeight: 500 }}>
                  {item.badge.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LandMedia;
