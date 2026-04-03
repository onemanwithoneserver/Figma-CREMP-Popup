import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Stack, Divider, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TerrainIcon from '@mui/icons-material/Terrain';
import StraightenIcon from '@mui/icons-material/Straighten';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import LandHeader from './landHeader';
import LandHighlights from './landHighlights';
import LandOverview from './landDetails/landOverview';
import LandMedia from './landMedia';
import LandSpecifications from './landDetails/landSpecifications';
import LandLocation from './landDetails/landLocation';
import LandTerms from './landDetails/landTerms';
import LandFooter from './landFooter';

interface LandViewAllProps {
  onBack?: () => void;
}

const KeyIconItem: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing="4px"
    sx={{
      flex: 1,
      padding: '4px',
      borderRadius: '4px',
      backgroundColor: 'var(--bg-app)',
      border: '1px solid var(--border-default)',
    }}
  >
    <Box sx={{ width: 28, height: 28, borderRadius: '4px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', flexShrink: 0 }}>
      {icon}
    </Box>
    <Stack spacing={0}>
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
        {label}
      </Typography>
    </Stack>
  </Stack>
);

const LandViewAll: React.FC<LandViewAllProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const isClickScrolling = useRef(false);

  const tabBarRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const overviewRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);

  const tabItems = [
    { id: 'overview', label: 'Overview', ref: overviewRef },
    { id: 'media', label: 'Media', ref: mediaRef },
    { id: 'specifications', label: 'Specifications', ref: specsRef },
    { id: 'location', label: 'Location', ref: locationRef },
    { id: 'terms', label: 'Terms', ref: termsRef },
  ];

  const handleMainScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;

      setIsScrolled(scrollTop > 150);

      if (!isClickScrolling.current) {
        const scrollPosition = scrollTop + 100;
        let currentFocusedTab = tabItems[0].id;

        for (const tab of tabItems) {
          if (tab.ref.current && tab.ref.current.offsetTop <= scrollPosition) {
            currentFocusedTab = tab.id;
          }
        }

        if (activeTab !== currentFocusedTab) {
          setActiveTab(currentFocusedTab);
        }
      }
    }
  };

  const handleTabBarScroll = () => {
    if (tabBarRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabBarRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    handleTabBarScroll();
    window.addEventListener('resize', handleTabBarScroll);
    return () => window.removeEventListener('resize', handleTabBarScroll);
  }, []);

  const scrollTabBar = (direction: 'left' | 'right') => {
    if (tabBarRef.current) {
      const scrollAmount = 200;
      tabBarRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTabClick = (id: string, ref: React.RefObject<HTMLDivElement | null>) => {
    isClickScrolling.current = true;
    setActiveTab(id);

    if (ref.current && scrollContainerRef.current) {
      const offsetTop = ref.current.offsetTop - 55;
      scrollContainerRef.current.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <Box sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#F9FAFB', overflow: 'hidden' }}>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transform: isScrolled ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isScrolled ? 1 : 0,
          pointerEvents: isScrolled ? 'auto' : 'none',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
        }}
      >
        {showLeftArrow && (
          <Box
            sx={{
              position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 10,
              display: 'flex', alignItems: 'center', px: '2px',
              background: 'linear-gradient(to right, #FFFFFF 60%, transparent)',
            }}
          >
            <IconButton size="small" onClick={() => scrollTabBar('left')} sx={{ color: '#1C2A44', backgroundColor: '#FFFFFF', boxShadow: '1px 0 4px rgba(0,0,0,0.05)' }}>
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Stack
          ref={tabBarRef}
          onScroll={handleTabBarScroll}
          direction="row"
          spacing={3}
          sx={{
            flex: 1,
            overflowX: 'auto',
            px: showLeftArrow ? '36px' : '16px',
            pr: showRightArrow ? '36px' : '16px',
            pt: '8px',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {tabItems
            .filter((tab) => tab.id !== activeTab)
            .map(tab => (
               <Box
                 key={tab.id}
                 onClick={() => handleTabClick(tab.id, tab.ref)}
                 sx={{
                   paddingBottom: '8px',
                   borderBottom: '2px solid transparent',
                   cursor: 'pointer',
                   whiteSpace: 'nowrap',

                 }}
               >
                 <Typography
                   sx={{
                     fontSize: '0.875rem',
                     fontWeight: 500,
                     color: '#6B7280',

                   }}
                 >
                   {tab.label}
                 </Typography>
               </Box>
          ))}
        </Stack>

        {showRightArrow && (
          <Box
            sx={{
              position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 10,
              display: 'flex', alignItems: 'center', px: '2px',
              background: 'linear-gradient(to left, #FFFFFF 60%, transparent)',
            }}
          >
            <IconButton size="small" onClick={() => scrollTabBar('right')} sx={{ color: '#1C2A44', backgroundColor: '#FFFFFF', boxShadow: '-1px 0 4px rgba(0,0,0,0.05)' }}>
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box
        ref={scrollContainerRef}
        onScroll={handleMainScroll}
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#D1D5DB', borderRadius: '4px' },
        }}
      >
        <LandHeader onBack={onBack} />
        <LandHighlights />

        <Box sx={{ padding: '8px 2px', backgroundColor: '#FFFFFF', mb: '4px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '4px' }}>
            <Box>
              <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: '#1C2A44', lineHeight: 1.2 }}>
                Plot GV-101
              </Typography>
              <Stack direction="row" alignItems="center" spacing="4px" sx={{ mt: '2px' }}>
                <LocationOnIcon sx={{ fontSize: 14, color: '#C89B3C' }} />
                <Typography sx={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Sector 12, Green Valley, Hyderabad
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ px: '4px', py: '2px', backgroundColor: '#FFFCF5', borderRadius: '4px', border: '1px solid #C89B3C' }}>
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: '#C89B3C'}}>
                Available
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: '4px' }}>
            <KeyIconItem icon={<TerrainIcon sx={{ fontSize: 16 }} />} value="2.5 Acres" label="Plot Size" />
            <KeyIconItem icon={<StraightenIcon sx={{ fontSize: 16 }} />} value="200 ft" label="Frontage" />
            <KeyIconItem icon={<VisibilityIcon sx={{ fontSize: 16 }} />} value="Main Road" label="Access" />
          </Box>
        </Box>

        <Box sx={{ px: '2px', pt: '4px', pb: '40px', display: 'flex', flexDirection: 'column', gap: '4px' }}>

          <Box ref={overviewRef}>
            <LandOverview />
          </Box>
          <Divider sx={{ mx: '2px', borderColor: '#E5E7EB' }} />

          <Box ref={mediaRef}>
            <LandMedia />
          </Box>
          <Divider sx={{ mx: '2px', borderColor: '#E5E7EB' }} />

          <Box ref={specsRef}>
            <LandSpecifications />
          </Box>
          <Divider sx={{ mx: '2px', borderColor: '#E5E7EB' }} />

          <Box ref={locationRef}>
            <LandLocation />
          </Box>
          <Divider sx={{ mx: '2px', borderColor: '#E5E7EB' }} />

          <Box ref={termsRef}>
            <LandTerms />
          </Box>

        </Box>
      </Box>

      <Box sx={{ flexShrink: 0, borderTop: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
        <LandFooter />
      </Box>
    </Box>
  );
};

export default LandViewAll;
