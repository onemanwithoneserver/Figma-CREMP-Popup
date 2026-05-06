// ─────────────────────────────────────────────
// broker.types.ts — Shared type definitions
// ─────────────────────────────────────────────

export type BrokerSpecialty =
  | 'Office'
  | 'Investment'
  | 'Retail'
  | 'Leasing'
  | 'Warehouse'
  | 'Industrial'
  | 'Land'
  | 'Residential';

export type BrokerSortOption =
  | 'relevance'
  | 'rating-high'
  | 'experience-high'
  | 'deals-high'
  | 'sqft-high';

export interface BrokerStat {
  label: string;
  value: string;
  unit?: string;
}

export interface Broker {
  id: string;
  name: string;
  company: string;
  avatarInitials: string;
  avatarColor: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  specialties: BrokerSpecialty[];
  location: string;
  cityArea: string;
  sqFtTransacted: string;
  dealsClosed: number;
  experienceYears: number;
  phone?: string;
  whatsapp?: string;
  bio?: string;
}

export interface FilterOption {
  id: string;
  label: string;
  icon?: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type: 'multi' | 'single';
}

export interface ActiveFilters {
  specialties: string[];
  locations: string[];
  dealTypes: string[];
  dealSizes: string[];
  experience: string | null;
  rating: string | null;
  search: string;
}

export interface MarketplaceStat {
  id: string;
  label: string;
  value: string;
  subLabel?: string;
  icon: string;
  accentColor: string;
}
