import React from 'react';

interface LeftPanelProps {
  activePage: string;
  onPageSelect: (page: string) => void;
}

interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-1 cursor-pointer rounded-[4px] text-[0.875rem] font-semibold transition-all duration-200 border-l-[2px] ${
        isActive
          ? 'bg-white text-[#1c2a44] border-[#D4AF37] shadow-sm shadow-[#1c2a44]/5'
          : 'text-[#1c2a44]/60 border-transparent hover:bg-[#1c2a44]/5 hover:text-[#1c2a44]'
      }`}
    >
      {label}
    </div>
  );
};

const LeftPanel: React.FC<LeftPanelProps> = ({ activePage, onPageSelect }) => {
  return (
    <div className="w-[25%] min-w-[240px] p-1 bg-[#f8f9fa] border-r border-[#1c2a44]/10 h-full overflow-auto flex flex-col">
      <h2 className="text-[1.125rem] font-semibold text-[#1c2a44] mb-1 px-1">
        Pages
      </h2>

      <h3 className="text-[0.65rem] font-semibold text-[#D4AF37]  tracking-[0.15em] mt-1 mb-1 px-1">
        All buildings
      </h3>
      
      <div className="flex flex-col gap-1">
        <NavItem
          label="1. Main screen"
          isActive={activePage === 'main'}
          onClick={() => onPageSelect('main')}
        />
        <NavItem
          label="2. View All"
          isActive={activePage === 'viewAll'}
          onClick={() => onPageSelect('viewAll')}
        />
      </div>

      <h3 className="text-[0.65rem] font-semibold text-[#D4AF37]  tracking-[0.15em] mt-1 mb-1 px-1">
        Land
      </h3>
      
      <div className="flex flex-col gap-1">
        <NavItem
          label="View All"
          isActive={activePage === 'landViewAll'}
          onClick={() => onPageSelect('landViewAll')}
        />
      </div>
    </div>
  );
};

export default LeftPanel;