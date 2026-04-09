import React from 'react';
import { CheckCircle, Language, Instagram, LinkedIn } from '@mui/icons-material';

interface FranchiseHeaderProps {
  isDesktop: boolean;
}

const FranchiseHeader: React.FC<FranchiseHeaderProps> = ({ isDesktop }) => {
  const logoImg = "https://content.jdmagicbox.com/v2/comp/katni/g2/9999p7622.7622.180208140640.l4g2/catalogue/brew-and-bites-cafe-katni-madhaw-nagar-katni-pizza-outlets-zg14lvpax8-250.jpg";

  return (
    <div className="w-full max-w-[80rem] flex justify-center ">
      <div className={`w-full max-w-[80rem] flex items-center border-b border-white/40 ${isDesktop ? 'px-10 py-6 gap-6' : 'p-2 gap-2'}`}>
        
        <div className={`shrink-0 rounded bg-white p-1 shadow-xl border border-white/40 ${isDesktop ? 'w-20 h-20' : 'w-16 h-16'}`}>
          <img 
            src={logoImg} 
            alt="Brew & Bites" 
            className="w-full h-full object-contain rounded-sm"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className={`font-bold text-white drop-shadow-md m-0 leading-tight ${isDesktop ? 'text-2xl' : 'text-lg'}`}>
              Brew & Bites
            </h1>
            <CheckCircle sx={{ fontSize: isDesktop ? '1.25rem' : '1rem', color: '#c9a34e' }} className="drop-shadow-md" />
          </div>

          <p className={`text-white/95 drop-shadow-md m-0 font-medium leading-tight ${isDesktop ? 'text-base mt-1' : 'text-xs mt-0.5'}`}>
            Premium Coffee & Artisanal Snacks
          </p>

          <div className={`flex items-center gap-2 text-white/80 drop-shadow-sm font-medium ${isDesktop ? 'text-sm mt-2' : 'text-[0.7rem] mt-1'}`}>
            <span>Est. 2018</span>
            <span className="opacity-50">•</span>
            <span>Mumbai, India</span>
          </div>
        </div>

        <div className={`flex flex-col items-end ${isDesktop ? 'gap-3' : 'gap-2'}`}>
          
          <button className={`bg-gradient-to-br from-[#c9a34e] to-[#b8903c]  text-white font-bold rounded shadow-lg hover:bg-[#b8903c] transition-colors active:scale-95 ${
            isDesktop ? 'px-4 py-2 text-s' : 'px-2 py-1.5 text-xs'
          }`}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FranchiseHeader;