import React from 'react';
import FranchiseHeader from './FranchiseHeader';
import MetricsGrid from './MetricsGrid';

interface FranchiseHeroProps {
  isDesktop: boolean;
}

const FranchiseHero: React.FC<FranchiseHeroProps> = ({ isDesktop }) => {
  const commonBgImg = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="relative w-full overflow-hidden bg-[#0f1f3d] max-w-[1200px] mx-auto rounded-[4px] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div className="absolute inset-0 z-0 flex justify-center">
        <div className="relative w-full max-w-[1200px] h-full">
          <img 
            src={commonBgImg} 
            alt="Restaurant Background" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-[#0f1f3d]/60" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <FranchiseHeader isDesktop={isDesktop} />
        <MetricsGrid isDesktop={isDesktop} />
      </div>
    </div>
  );
};

export default FranchiseHero;