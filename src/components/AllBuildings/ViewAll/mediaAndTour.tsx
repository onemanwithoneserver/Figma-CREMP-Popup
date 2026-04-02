import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const thumbnails = [
  '/images/viewall/thumb1.png',
  '/images/viewall/thumb2.png',
  '/images/viewall/thumb3.png',
  '/images/viewall/thumb4.png',
];

const MediaAndTour: React.FC = () => {
  return (
    <Box sx={{ px: 2, py: 1.5 }}>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          color: '#1a237e',
          mb: 1.5,
        }}
      >
        Media & tours
      </Typography>

      {/* Main Preview Image with Play Button */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 180,
          borderRadius: '10px',
          overflow: 'hidden',
          mb: 1,
        }}
      >
        <Box
          component="img"
          src="/images/viewall/media-main.png"
          alt="Media Preview"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PlayCircleFilledIcon
            sx={{
              fontSize: 52,
              color: 'rgba(255,255,255,0.9)',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </Box>
      </Box>

      {/* Thumbnails Strip */}
      <Stack
        direction="row"
        spacing={0.75}
        sx={{
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {thumbnails.map((thumb, idx) => (
          <Box
            key={idx}
            sx={{
              position: 'relative',
              width: 72,
              height: 56,
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            <Box
              component="img"
              src={thumb}
              alt={`Thumbnail ${idx + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* +12 More overlay on last thumbnail */}
            {idx === thumbnails.length - 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(26, 35, 126, 0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                }}
              >
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  +12 More
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MediaAndTour;
