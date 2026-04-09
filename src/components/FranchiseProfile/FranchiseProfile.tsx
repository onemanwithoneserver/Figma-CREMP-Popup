import { useState, useRef, useEffect, Suspense, lazy } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';

import PremiumTabs from '../ui/PremiumTabs';
import { data } from './data';
import FranchiseHero from './sections/FranchiseHero';
import BusinessOverview from './sections/BusinessOverview';
import USPSection from './sections/USPSection';
import FinancialRequirements from './sections/FinancialRequirements';
import SetupSupport from './sections/SetupSupport';
import TerritoryNetwork from './sections/TerritoryNetwork';
import MediaSection from './sections/MediaSection';

const MapView = lazy(() => import('./sections/MapView'));

const MapFallback = ({ isDesktop }: { isDesktop: boolean }) => (
  <div
    className={`bg-[#f8fafc] rounded border border-[#e2e8f0] flex items-center justify-center ${
      isDesktop ? 'h-[20rem]' : 'h-[15rem]'
    }`}
  >
    <span className="text-[0.8rem] text-[#94a3b8]">Loading map…</span>
  </div>
);

type TabId = 'overview' | 'investment' | 'support' | 'territory' | 'media';

const tabs: { label: string; value: TabId }[] = [
  { label: 'Overview', value: 'overview' },
  { label: 'Investment', value: 'investment' },
  { label: 'Support', value: 'support' },
  { label: 'Territory', value: 'territory' },
  { label: 'Media', value: 'media' },
];

export default function FranchiseProfile({ viewMode }: { viewMode: 'desktop' | 'mobile' }) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = viewMode === 'desktop';

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const scrollPos = scrollContainerRef.current.scrollTop + 130;
      const ids: TabId[] = ['overview', 'investment', 'support', 'territory', 'media'];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(`section-${ids[i]}`);
        if (el && scrollPos >= el.offsetTop) {
          setActiveTab(ids[i]);
          break;
        }
      }
    };
    const c = scrollContainerRef.current;
    c?.addEventListener('scroll', handleScroll, { passive: true });
    return () => c?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (id: TabId) => {
    setActiveTab(id);
    const el = document.getElementById(`section-${id}`);
    if (el && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: el.offsetTop - 44, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center overflow-hidden ${
        isDesktop ? 'bg-[#f4f7f9]' : 'h-screen bg-white'
      }`}
    >
      <div
        className={`transition-all duration-500 mx-auto overflow-hidden shadow-2xl bg-white ${
          isDesktop
            ? 'max-w-[100%] w-[100%] rounded-none border border-[#1c2a44]/10'
            : 'w-[24.375rem] shrink-0 pt-2 rounded-none'
        }`}
        style={{ height: isDesktop ? 'calc(100vh - 6.25rem)' : '48.75rem' }}
      >
        <div className="relative h-full flex flex-col">

          <div className="absolute bottom-6 right-6 z-[99] flex flex-col items-end gap-2.5">
            <div
              className={`flex flex-col gap-2.5 items-end transition-all duration-300 origin-bottom ${
                isFabExpanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
              }`}
            >
              <a
                href="#"
                aria-label="Facebook"
                className="w-[2.75rem] h-[2.75rem] rounded bg-[#1877F2] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                <FacebookIcon sx={{ color: 'white', fontSize: '1.125rem' }} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-[2.75rem] h-[2.75rem] rounded bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                <InstagramIcon sx={{ color: 'white', fontSize: '1.125rem' }} />
              </a>
              <a
                href={`https://wa.me/${data.contact.whatsapp.replace(/\D/g, '')}`}
                aria-label="WhatsApp"
                target="_blank"
                rel="noreferrer"
                className="w-[2.75rem] h-[2.75rem] rounded bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                <WhatsAppIcon sx={{ color: 'white', fontSize: '1.125rem' }} />
              </a>
            </div>
            <button
              onClick={() => setIsFabExpanded(v => !v)}
              className={`w-[2.75rem] h-[2.75rem] rounded flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 ${
                isFabExpanded ? 'bg-[#EF4444]' : 'bg-[#1c2a44]'
              }`}
            >
              {isFabExpanded
                ? <CloseIcon sx={{ color: 'white', fontSize: '1.125rem' }} />
                : <PhoneIcon sx={{ color: 'white', fontSize: '1.125rem' }} />}
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth [&::-webkit-scrollbar]:w-[0.25rem] [&::-webkit-scrollbar-thumb]:bg-[#1c2a44]/15 [&::-webkit-scrollbar-thumb]:rounded"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <FranchiseHero isDesktop={isDesktop} />

            <div className="sticky top-0 z-40 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className={isDesktop ? 'max-w-[80rem] mx-auto px-6' : 'px-1'}>
                <PremiumTabs
                  tabs={tabs}
                  value={activeTab}
                  onChange={(v) => handleTabClick(v as TabId)}
                />
              </div>
            </div>

            {isDesktop ? (
              <div className="max-w-[80rem] mx-auto px-10 py-6 pb-12">
                <div className="grid grid-cols-[1fr_22rem] gap-6 items-start">

                  <div className="flex flex-col gap-6">
                    <section id="section-overview" className="flex flex-col gap-6">
                      <BusinessOverview isDesktop={isDesktop} />
                      <USPSection isDesktop={isDesktop} />
                    </section>

                    <section id="section-investment" className="pt-2">
                      <FinancialRequirements isDesktop={isDesktop} />
                    </section>

                    <section id="section-support" className="pt-2">
                      <SetupSupport isDesktop={isDesktop} />
                    </section>

                    <section id="section-territory" className="pt-2">
                      <TerritoryNetwork isDesktop={isDesktop} />
                    </section>

                    <section id="section-media" className="pt-2">
                      <MediaSection isDesktop={isDesktop} />
                    </section>
                  </div>

                  <div className="sticky top-[4rem]">
                    <Suspense fallback={<MapFallback isDesktop={isDesktop} />}>
                      <MapView isDesktop={isDesktop} />
                    </Suspense>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col pb-24 px-4 gap-4 mt-4">

                <div id="section-overview" className="flex flex-col gap-4">
                  <BusinessOverview isDesktop={isDesktop} />

                  <div className="w-full">
                    <Suspense fallback={<MapFallback isDesktop={isDesktop} />}>
                      <MapView isDesktop={isDesktop} />
                    </Suspense>
                  </div>

                  <div>
                    <USPSection isDesktop={isDesktop} />
                  </div>
                </div>

                <div id="section-investment">
                  <FinancialRequirements isDesktop={isDesktop} />
                </div>

                <div id="section-support">
                  <SetupSupport isDesktop={isDesktop} />
                </div>

                <div id="section-territory">
                  <TerritoryNetwork isDesktop={isDesktop} />
                </div>

                <div id="section-media">
                  <MediaSection isDesktop={isDesktop} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}