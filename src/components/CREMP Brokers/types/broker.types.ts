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
  | 'Residential'
  | 'Co-working'
  | 'Mixed Use';

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

export interface BrokerTestimonial {
  companyName: string;
  companyInitials: string;
  companyColor: string;
  author: string;
  role: string;
  text: string;
  dealType: string;
  sqFt?: string;
  value?: string;
  location?: string;
  rating: number;
}

export interface BrokerTransaction {
  type: string;
  location: string;
  size?: string;
  value?: string;
  icon: 'office' | 'retail' | 'land' | 'investment' | 'warehouse' | 'mixed';
}

export interface ServiceableLocation {
  label: string;
  tier: 'most-active' | 'moderately-active' | 'based-on-request';
}

export interface Broker {
  id: string;
  name: string;
  company: string;
  avatarInitials: string;
  avatarColor: string;
  avatarUrl?: string;
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
  // Rich profile fields
  dealValue?: string;
  enterpriseClients?: number;
  avgDealClosure?: string;
  reraNumber?: string;
  reraBody?: string;
  reraValidTill?: string;
  dealTypes?: string[];
  minDealSize?: string;
  brokerageStructure?: string;
  commercialTerms?: string;
  keyMetrics?: { label: string; value: string }[];
  worksWithTypes?: string[];
  investorServices?: string[];
  whyChoose?: string[];
  languages?: string[];
  aboutHighlights?: string[];
  serviceableLocations?: ServiceableLocation[];
  recentTransactions?: BrokerTransaction[];
  testimonials?: BrokerTestimonial[];
  responseTime?: string;
  experienceBadge?: string;
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
