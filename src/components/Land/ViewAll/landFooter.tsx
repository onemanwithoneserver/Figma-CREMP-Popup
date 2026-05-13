import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface FooterAction {
  icon: React.ReactNode;
  label: string;
}

const footerActions: FooterAction[] = [
  {
    icon: <ShareIcon sx={{ fontSize: 16, color: 'white' }} />,
    label: 'Share',
  },
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 16, color: 'white' }} />,
    label: 'Site Visit',
  },
  {
    icon: <BookmarkBorderIcon sx={{ fontSize: 16, color: 'white' }} />,
    label: 'Save',
  },
  {
    icon: <VisibilityOffIcon sx={{ fontSize: 16, color: 'white' }} />,
    label: 'Hide',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 16, color: '#4caf50' }} />,
    label: 'Contact',
  },
];

const LandFooter: React.FC = () => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[#1c2a44] border-t border-[#243355] z-10 shadow-[0_-4px_16px_rgba(28,42,68,0.2)]">
      {/* Logo strip */}
      <div className="flex items-center justify-center gap-1.5 pt-2 pb-1">
        <img src="/favicon.svg" alt="CREMP" className="w-4 h-4" />
        <span
          className="text-[11px] font-bold tracking-[0.12em] uppercase"
          style={{ color: '#D4AF37', fontFamily: 'Outfit, sans-serif' }}
        >
          CREMP
        </span>
      </div>
      {/* Actions row */}
      <div className="flex justify-around items-center p-1">
      {footerActions.map((action, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center flex-1 p-1 gap-1 cursor-pointer rounded text-white hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300 group"
        >
          <div className="flex items-center justify-center group-hover:scale-110 transition-all duration-300">
            {action.icon}
          </div>
          <span className="text-[0.6rem] font-bold tracking-wide transition-colors duration-300">
            {action.label}
          </span>
        </div>
      ))}      </div>    </div>
  );
};

export default LandFooter;
