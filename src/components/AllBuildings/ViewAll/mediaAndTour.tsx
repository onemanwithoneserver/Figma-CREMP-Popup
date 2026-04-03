import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const thumbnails = [
  'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
];

const MediaAndTour: React.FC = () => {
  return (
    <Box sx={{ padding: '4px' }}>
      <Typography
        sx={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-main)',
          marginBottom: '4px',
          paddingLeft: '4px',
        }}
      >
        Media & tours
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 180,
          borderRadius: '4px',
          border: '1px solid var(--border-default)',
          overflow: 'hidden',
          marginBottom: '4px',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
          alt="Media Preview"
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
            inset: 0,
            backgroundColor: 'rgba(15, 26, 44, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PlayCircleFilledIcon
            sx={{
              fontSize: 48,
              color: 'var(--accent-gold)',
              filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.3))',
              cursor: 'pointer',
            }}
          />
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing="4px"
        sx={{
          overflowX: 'auto',
          padding: '2px',
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
              borderRadius: '4px',
              border: '1px solid rgba(198, 156, 68, 0.3)',
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
            {idx === thumbnails.length - 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(15, 26, 44, 0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                }}
              >
                <Typography
                  sx={{
                    color: 'var(--accent-gold)',
                    fontSize: '0.65rem',
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