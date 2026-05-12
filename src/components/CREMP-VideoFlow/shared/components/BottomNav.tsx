// ─────────────────────────────────────────────────────────
// BottomNav.tsx — Persistent bottom navigation bar
// ─────────────────────────────────────────────────────────
import { Home, Search, Bookmark, Bell, User } from 'lucide-react';

const navItems = [
  { icon: Home,     label: 'Home',    key: 'home' },
  { icon: Search,   label: 'Discover',key: 'discover' },
  { icon: Bookmark, label: 'Saved',   key: 'saved' },
  { icon: Bell,     label: 'Alerts',  key: 'alerts' },
  { icon: User,     label: 'Profile', key: 'profile' },
];

interface BottomNavProps {
  activeKey?: string;
}

export default function BottomNav({ activeKey = 'home' }: BottomNavProps) {
  return (
    <nav
      className="vf-luxury-bottom-nav flex items-center justify-around px-2 pb-safe"
      style={{ height: 64, fontFamily: "'Outfit', sans-serif" }}
    >
      {navItems.map(({ icon: Icon, label, key }) => {
        const isActive = key === activeKey;
        return (
          <button
            key={key}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-all duration-200"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Icon
              size={20}
              style={{
                color: isActive ? '#d4af37' : 'rgba(255,255,255,0.28)',
                transition: 'color 0.22s ease',
                strokeWidth: isActive ? 2.2 : 1.6,
              }}
            />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#d4af37' : 'rgba(255,255,255,0.28)',
                fontFamily: "'Outfit', sans-serif",
                transition: 'color 0.22s ease',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
