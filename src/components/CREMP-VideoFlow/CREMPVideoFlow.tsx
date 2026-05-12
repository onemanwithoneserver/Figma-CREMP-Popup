import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { PropertyVideo, VideoFlowScreen } from './shared/theme/videoflow.types';
import DiscoveryGridPage from './screen-1-discovery-grid/page';
import VideoPlayerPage from './screen-2-video-player/page';
import SwipeNextVideoPage from './screen-3-swipe-next-video/page';
import AnotherVideoPage from './screen-4-another-video/page';
import { propertyVideos } from './screen-1-discovery-grid/data';

interface CREMPVideoFlowProps {
  viewMode?: 'desktop' | 'mobile'; // kept for App.tsx compat, always renders mobile
}

export default function CREMPVideoFlow({ viewMode: _viewMode = 'desktop' }: CREMPVideoFlowProps) {
  const [screen, setScreen] = useState<VideoFlowScreen>('discovery');
  const [selectedVideo, setSelectedVideo] = useState<PropertyVideo>(propertyVideos[0]);
  const [videoIndex, setVideoIndex] = useState(0);

  const handleVideoSelect = (video: PropertyVideo) => {
    const idx = propertyVideos.findIndex((v) => v.id === video.id);
    setSelectedVideo(video);
    setVideoIndex(idx >= 0 ? idx : 0);
    setScreen('player');
  };

  const handleSwipeNext = (video: PropertyVideo) => {
    const idx = propertyVideos.findIndex((v) => v.id === video.id);
    setSelectedVideo(video);
    setVideoIndex(idx >= 0 ? idx : 0);
    setScreen('swipe');
  };

  const handleVideoChange = (video: PropertyVideo, idx: number) => {
    setSelectedVideo(video);
    setVideoIndex(idx);
    if (idx >= 2) setScreen('continue');
  };

  const handleSelectSuggested = (video: PropertyVideo) => {
    const idx = propertyVideos.findIndex((v) => v.id === video.id);
    setSelectedVideo(video);
    setVideoIndex(idx >= 0 ? idx : 0);
    setScreen('player');
  };

  return (
    <div className="w-full h-full bg-[#f0f2f5] flex items-center justify-center overflow-hidden">
      <div className="relative overflow-hidden bg-[#f5f7fa] shrink-0 w-[24.375rem] h-[52.75rem] max-h-full rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
        <AnimatePresence mode="wait">
          {screen === 'discovery' && (
            <div key="discovery" className="absolute inset-0">
              <DiscoveryGridPage
                onVideoSelect={handleVideoSelect}
              />
            </div>
          )}

          {screen === 'player' && (
            <div key="player" className="absolute inset-0">
              <VideoPlayerPage
                selectedVideo={selectedVideo}
                onBack={() => setScreen('discovery')}
                onSwipeNext={handleSwipeNext}
              />
            </div>
          )}

          {screen === 'swipe' && (
            <div key="swipe" className="absolute inset-0">
              <SwipeNextVideoPage
                currentVideo={selectedVideo}
                currentIndex={videoIndex}
                onBack={() => setScreen('player')}
                onVideoChange={handleVideoChange}
              />
            </div>
          )}

          {screen === 'continue' && (
            <div key="continue" className="absolute inset-0">
              <AnotherVideoPage
                currentVideo={selectedVideo}
                currentIndex={videoIndex}
                onBack={() => setScreen('swipe')}
                onSelectVideo={handleSelectSuggested}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}