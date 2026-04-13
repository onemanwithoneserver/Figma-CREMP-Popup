import { useState, useEffect } from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import SidebarNavigation from './components/SidebarNavigation';
import type { PageId } from './components/SidebarNavigation';
import RoleGuard from './components/RoleGuard';
import ListFranchise from './pages/ListFranchise';
import SavedListings from './pages/SavedListings';
import Leads from './pages/Leads';
import PostRequirement from './pages/PostRequirement';
import MyListings from './pages/MyListings';
import MyPackages from './pages/Packages/MyPackages';
import Compare from './pages/Compare';
import HiddenListings from './pages/HiddenListings';

interface PostRegistrationProps {
  viewMode: 'desktop' | 'mobile';
  userType: 'seller' | 'buyer';
}

const PAGE_TITLES: Record<PageId, string> = {
  overview:          'Dashboard',
  'list-franchise':  'List Your Franchise',
  'saved-listings':  'Saved Listings',
  leads:             'Leads',
  'post-requirement': 'Post Requirement',
  'my-listings':     'My Listings',
  'my-packages':     'My Packages',
  compare:           'Compare',
  'hidden-listings': 'Hidden Listings',
};

const SELLER_TILES = [
  { label: 'Active Listings',  value: '5',  sub: '+2 this month',   icon: ListAltOutlinedIcon,        page: 'my-listings'      as PageId, color: 'emerald' },
  { label: 'Leads Received',   value: '14', sub: 'This month',      icon: PeopleAltOutlinedIcon,      page: 'leads'            as PageId, color: 'blue' },
  { label: 'Saved Franchises', value: '6',  sub: '1 new',           icon: BookmarkBorderOutlinedIcon, page: 'saved-listings'   as PageId, color: 'amber' },
  { label: 'Active Package',   value: '1',  sub: '18 days left',    icon: CardMembershipOutlinedIcon, page: 'my-packages'      as PageId, color: 'purple' },
];

const BUYER_TILES = [
  { label: 'Saved Franchises', value: '6',  sub: '2 new this week', icon: BookmarkBorderOutlinedIcon, page: 'saved-listings'   as PageId, color: 'amber' },
  { label: 'Hidden Listings',  value: '4',  sub: 'Manage visibility', icon: VisibilityOffOutlinedIcon,  page: 'hidden-listings'  as PageId, color: 'gray' },
  { label: 'My Requirements',  value: '2',  sub: 'Active postings',  icon: PostAddOutlinedIcon,        page: 'post-requirement' as PageId, color: 'blue' },
  { label: 'Comparisons',      value: '3',  sub: 'Items compared',   icon: CompareArrowsOutlinedIcon,  page: 'compare'          as PageId, color: 'emerald' },
];

const TILE_COLORS: Record<string, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  blue:    'bg-blue-50    text-blue-700    border-blue-100',
  amber:   'bg-amber-50   text-amber-700   border-amber-100',
  purple:  'bg-purple-50  text-purple-700  border-purple-100',
  gray:    'bg-gray-100   text-gray-600    border-gray-200',
};

interface OverviewProps {
  userType: 'seller' | 'buyer';
  isDesktop: boolean;
  onNavigate: (page: PageId) => void;
}

function Overview({ userType, isDesktop, onNavigate }: OverviewProps) {
  const tiles = userType === 'seller' ? SELLER_TILES : BUYER_TILES;
  const quickActions = userType === 'seller'
    ? [
        { label: 'List a Franchise',  icon: AddBusinessOutlinedIcon, page: 'list-franchise'   as PageId },
        { label: 'View My Listings',  icon: ListAltOutlinedIcon,     page: 'my-listings'      as PageId },
        { label: 'Check Leads',       icon: PeopleAltOutlinedIcon,   page: 'leads'            as PageId },
      ]
    : [
        { label: 'Browse Saved',      icon: BookmarkBorderOutlinedIcon, page: 'saved-listings'   as PageId },
        { label: 'Post a Requirement',icon: PostAddOutlinedIcon,        page: 'post-requirement' as PageId },
        { label: 'Compare Franchises',icon: CompareArrowsOutlinedIcon,  page: 'compare'          as PageId },
      ];

  return (
    <div className="flex flex-col gap-3">
      <div className={`grid gap-2 ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'}`}>
        {tiles.map(({ label, value, sub, icon: Icon, page, color }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className="bg-white rounded-[7px] border border-black/[0.03] shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-3 text-left hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 group"
          >
            <div className="flex items-start justify-between gap-1 mb-1">
              <div className="text-left">
                <p className="text-xl font-medium text-[#0a1128] leading-tight">{value}</p>
                <p className="text-[11px] font-medium text-[#0a1128] leading-tight">{label}</p>
              </div>
              <div className={`w-7 h-7 rounded-[4px] flex items-center justify-center shrink-0 border ${TILE_COLORS[color]}`}>
                <Icon sx={{ fontSize: 15 }} />
              </div>
            </div>
            <p className="text-[10px] font-light text-[#a0aabf] mt-1">{sub}</p>
            <div className="flex items-center gap-0.5 mt-1 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-[10px] font-medium">View</span>
              <ChevronRightIcon sx={{ fontSize: 11 }} />
            </div>
          </button>
        ))}
      </div>

      <div>
        <h3 className="text-[11px] font-semibold text-[#637089] tracking-wide mb-1.5 ">Quick Actions</h3>
        <div className={`flex gap-2 ${isDesktop ? '' : 'flex-col'}`}>
          {quickActions.map(({ label, icon: Icon, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-[7px] border border-black/[0.03] shadow-[0_1px_4px_rgba(0,0,0,0.03)] text-xs font-light text-[#637089] hover:border-[#d4af37]/40 hover:text-[#0a1128] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200"
            >
              <Icon sx={{ fontSize: 15, color: '#d4af37' }} />
              {label}
              <ChevronRightIcon sx={{ fontSize: 14, color: '#a0aabf', marginLeft: 'auto' }} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-semibold text-[#637089] tracking-wide mb-1.5 ">Recent Activity</h3>
        <div className="bg-white rounded-[7px] border border-black/[0.03] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          {[
            { text: 'New lead from Rahul Sharma', time: '2 hrs ago', color: 'blue' },
            { text: 'Listing "Sunrise Café" approved', time: '1 day ago', color: 'emerald' },
            { text: 'Package renewed — Starter Plan', time: '3 days ago', color: 'amber' },
          ].map(({ text, time, color }, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2 border-b border-black/[0.03] last:border-b-0 hover:bg-[#fafafb] transition-colors">
              <div className={`w-1.5 h-1.5 rounded-[4px] shrink-0 ${
                color === 'blue' ? 'bg-blue-400' : color === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
              <p className="flex-1 text-xs font-light text-[#0a1128]">{text}</p>
              <p className="text-[10px] font-light text-[#a0aabf] shrink-0">{time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PAGE_ACCESS: Record<PageId, ('seller' | 'buyer')[]> = {
  overview:          ['seller', 'buyer'],
  'list-franchise':  ['seller'],
  'saved-listings':  ['seller', 'buyer'],
  leads:             ['seller'],
  'post-requirement': ['seller', 'buyer'],
  'my-listings':     ['seller'],
  'my-packages':     ['seller'],
  compare:           ['seller', 'buyer'],
  'hidden-listings': ['buyer'],
};

export default function PostRegistration({ viewMode, userType }: PostRegistrationProps) {
  const isDesktop = viewMode === 'desktop';
  const [activePage, setActivePage] = useState<PageId>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActivePage('overview');
    setMobileMenuOpen(false);
  }, [userType]);

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    const allowed = PAGE_ACCESS[activePage];
    return (
      <RoleGuard allowed={allowed} currentRole={userType}>
        {activePage === 'overview'          && <Overview userType={userType} isDesktop={isDesktop} onNavigate={handleNavigate} />}
        {activePage === 'list-franchise'    && <ListFranchise isDesktop={isDesktop} />}
        {activePage === 'saved-listings'    && <SavedListings isDesktop={isDesktop} />}
        {activePage === 'leads'             && <Leads isDesktop={isDesktop} />}
        {activePage === 'post-requirement'  && <PostRequirement isDesktop={isDesktop} userType={userType} />}
        {activePage === 'my-listings'       && <MyListings isDesktop={isDesktop} />}
        {activePage === 'my-packages'       && <MyPackages isDesktop={isDesktop} />}
        {activePage === 'compare'           && <Compare isDesktop={isDesktop} />}
        {activePage === 'hidden-listings'   && <HiddenListings isDesktop={isDesktop} />}
      </RoleGuard>
    );
  };

  return (
    <div
      className={`w-full flex flex-col ${isDesktop ? 'items-stretch bg-[#fafafb]' : 'items-center justify-start bg-[#fafafb]'}`}
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <div
        className={`flex flex-col transition-all duration-700 ease-in-out ${
          isDesktop
            ? 'w-full h-full'
            : 'w-[24.375rem] shrink-0 h-full rounded-none shadow-[0_0_40px_rgba(0,0,0,0.08)]'
        }`}
      >
        <div className="w-full bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] relative overflow-hidden shrink-0 border-b border-white/[0.05]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#d4af37]/10 blur-[80px] -translate-y-1/3 translate-x-1/4 rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] translate-y-1/3 -translate-x-1/4 rounded-full pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className={`w-full relative z-10 flex items-center justify-between gap-3 ${isDesktop ? 'px-6 py-4' : 'px-4 py-4'}`}>
            {!isDesktop && (
              <button
                onClick={() => setMobileMenuOpen((p) => !p)}
                className="shrink-0 w-9 h-9 rounded-[4px] border border-white/10 hover:border-[#d4af37]/40 bg-white/5 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-white/10"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen
                  ? <CloseIcon sx={{ fontSize: '1.2rem', color: '#ffffff' }} />
                  : <MenuIcon sx={{ fontSize: '1.2rem', color: '#ffffff' }} />}
              </button>
            )}

            <div className="flex-1 min-w-0">
              {activePage !== 'overview' && (
                <p className="text-[#d4af37]/70 text-[10px] font-semibold tracking-wide mb-0.5">
            
                </p>
              )}
              <h1 className={`font-extralight text-white tracking-wide ${isDesktop ? 'text-2xl' : 'text-lg'}`}>
                {activePage === 'overview' ? (
                  <>
                    Welcome back,{' '}
                    <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]">
                      {userType === 'seller' ? 'Seller' : 'Buyer'}
                    </span>
                  </>
                ) : (
                  PAGE_TITLES[activePage]
                )}
              </h1>
            </div>

            <div className={`shrink-0 rounded-[4px] border border-[#d4af37]/20 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.05)] ${isDesktop ? 'w-10 h-10' : 'w-9 h-9'}`}>
              {userType === 'seller'
                ? <StorefrontIcon sx={{ fontSize: isDesktop ? '1.25rem' : '1.1rem', color: '#e5c158' }} />
                : <PersonSearchIcon sx={{ fontSize: isDesktop ? '1.25rem' : '1.1rem', color: '#e5c158' }} />
              }
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          {isDesktop && (
            <SidebarNavigation
              activePage={activePage}
              onNavigate={handleNavigate}
              userType={userType}
              isDesktop={true}
            />
          )}

          {!isDesktop && (
            <SidebarNavigation
              activePage={activePage}
              onNavigate={handleNavigate}
              userType={userType}
              isDesktop={false}
              mobileOpen={mobileMenuOpen}
              onMobileClose={() => setMobileMenuOpen(false)}
            />
          )}

          <div className={`flex-1 overflow-y-auto ${isDesktop ? 'px-6 py-5' : 'px-3 py-4'}`}>
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}