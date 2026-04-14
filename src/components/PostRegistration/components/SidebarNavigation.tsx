import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export type PageId =
  | 'overview'
  | 'list-franchise'
  | 'saved-listings'
  | 'leads'
  | 'post-requirement'
  | 'my-listings'
  | 'my-packages'
  | 'compare'
  | 'hidden-listings';

interface NavItem {
  id: PageId;
  label: string;
  Icon: React.ElementType;
  roles: ('seller' | 'buyer')[];
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview',          label: 'Overview',         Icon: HomeOutlinedIcon,              roles: ['seller', 'buyer'] },
  { id: 'list-franchise',    label: 'List Franchise',   Icon: AddBusinessOutlinedIcon,       roles: ['seller'] },
  { id: 'my-listings',       label: 'My Listings',      Icon: ListAltOutlinedIcon,           roles: ['seller'] },
  { id: 'leads',             label: 'Leads',            Icon: PeopleAltOutlinedIcon,         roles: ['seller'] },
  { id: 'saved-listings',    label: 'Saved',            Icon: BookmarkBorderOutlinedIcon,    roles: ['seller', 'buyer'] },
  { id: 'post-requirement',  label: 'Post Requirement', Icon: PostAddOutlinedIcon,           roles: ['seller', 'buyer'] },
  { id: 'my-packages',       label: 'My Packages',      Icon: CardMembershipOutlinedIcon,    roles: ['seller'] },
  { id: 'compare',           label: 'Compare',          Icon: CompareArrowsOutlinedIcon,     roles: ['seller', 'buyer'] },
  { id: 'hidden-listings',   label: 'Hidden',           Icon: VisibilityOffOutlinedIcon,     roles: ['buyer'] },
];

interface SidebarNavigationProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  userType: 'seller' | 'buyer';
  isDesktop: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function SidebarNavigation({ activePage, onNavigate, userType, isDesktop, mobileOpen = false, onMobileClose }: SidebarNavigationProps) {
  const items = NAV_ITEMS.filter((item) => item.roles.includes(userType));

  if (isDesktop) {
    return (
      <nav className="w-52 shrink-0 bg-white border-r border-black/[0.03] flex flex-col py-4 overflow-y-auto">
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-all duration-200 ${
              activePage === id
                ? 'bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#0a1128] border-r-2 border-[#d4af37] font-semibold'
                : 'font-medium text-[#637089] hover:bg-[#fafafb] hover:text-[#0a1128]'
            }`}
          >
            <Icon sx={{ fontSize: 18, flexShrink: 0, color: activePage === id ? '#d4af37' : 'inherit' }} />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </nav>
    );
  }

  return (
    <>
      <div
        className={`absolute inset-0 z-20 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10,17,40,0.35)' }}
        onClick={onMobileClose}
      />

      <div
        className={`absolute top-0 left-0 bottom-0 w-64 z-30 bg-white overflow-y-auto transition-transform duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.12)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="py-5">
          {items.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { onNavigate(id); onMobileClose?.(); }}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-left text-sm transition-all duration-150 ${
                activePage === id
                  ? 'bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#0a1128] border-l-2 border-[#d4af37] font-semibold pl-[18px]'
                  : 'font-medium text-[#637089] hover:bg-[#fafafb] hover:text-[#0a1128] border-l-2 border-transparent pl-[18px]'
              }`}
            >
              <Icon sx={{ fontSize: 19, flexShrink: 0, color: activePage === id ? '#d4af37' : 'inherit' }} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}