/**
 * BrokerProfilePage — Redesigned v2
 * Comprehensive profile matching the reference design.
 * Mobile: single-column scroll with sticky bottom CTA.
 * Desktop: richer multi-column layout.
 *
 * Split into sub-files under this folder:
 *   constants.ts          — pure data constants
 *   icons.tsx             — SVG icon maps
 *   StarRating.tsx        — star display component
 *   SectionHeader.tsx     — gold-accent section heading
 *   FullMapOverlay.tsx    — full-screen map overlay
 *   ProfileHeader.tsx     — dark navy hero header
 *   StatsBar.tsx          — 4-stat horizontal bar
 *   CommercialExpertise.tsx
 *   DealSection.tsx
 *   AboutSection.tsx
 *   ServiceableLocations.tsx
 *   Testimonials.tsx      — TestimonialCard + TestimonialsSection
 *   RecentTransactions.tsx
 *   RERASection.tsx
 *   BottomCTABar.tsx
 */

import type { Broker } from '../../types/broker.types';
import { ProfileHeader } from './ProfileHeader';
import { StatsBar } from './StatsBar';
import { CommercialExpertise } from './CommercialExpertise';
import { DealSection } from './DealSection';
import { AboutSection } from './AboutSection';
import { ServiceableLocationsSection } from './ServiceableLocations';
import { TestimonialsSection } from './Testimonials';
import { RecentTransactionsSection } from './RecentTransactions';
import { RERASection } from './RERASection';
import { BottomCTABar } from './BottomCTABar';

interface BrokerProfilePageProps {
  broker: Broker;
  isDesktop: boolean;
}

export default function BrokerProfilePage({ broker, isDesktop }: BrokerProfilePageProps) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative bg-[#f5f6fa]" style={{ fontFamily: 'Outfit, sans-serif' }}>

      {/* ── Everything scrolls together — no fixed header ── */}
      <div className="flex-1 min-h-0 overflow-y-auto cb-scroll-thin">
        <ProfileHeader broker={broker} isDesktop={isDesktop} />
        <StatsBar broker={broker} isDesktop={isDesktop} />
        <CommercialExpertise broker={broker} isDesktop={isDesktop} />

        {/* Deal Types */}
        <DealSection broker={broker} isDesktop={isDesktop} />

        {/* Serviceable Locations */}
        {(broker.serviceableLocations?.length ?? 0) > 0 && (
          <ServiceableLocationsSection broker={broker} isDesktop={isDesktop} />
        )}

        {/* About + Key Metrics */}
        <AboutSection broker={broker} isDesktop={isDesktop} />

        {/* Client Testimonials */}
        <TestimonialsSection broker={broker} isDesktop={isDesktop} />

        {/* Recent Transactions */}
        <RecentTransactionsSection broker={broker} isDesktop={isDesktop} />

        {/* RERA Verification */}
        <RERASection broker={broker} isDesktop={isDesktop} />

        <div className="h-2" />
      </div>

      {/* ── Sticky bottom CTA ── */}
      <BottomCTABar broker={broker} isDesktop={isDesktop} />
    </div>
  );
}
