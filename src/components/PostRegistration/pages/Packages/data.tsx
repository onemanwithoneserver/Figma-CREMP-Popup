// ─── Active / History Plans ────────────────────────────────────────────────

export interface Plan {
  id: string;
  name: string;
  price: string;
  validityLabel: string;
  daysLeft: number;
  purchasedOn: string;
  features: string[];
  usage: {
    listingsUsed: number;
    listingsTotal: number;
    leadsReceived: number;
    leadsTotal: number;
  };
  badge?: string;
  isCurrent?: boolean;
}

// PLANS will be fetched from backend API
export const PLANS: Plan[] = [];

export const STATUS_STYLES: Record<string, string> = {
  Active:  'bg-emerald-50 text-emerald-700 border border-emerald-100',
  Expired: 'bg-red-50 text-red-600 border border-red-100',
};

// ─── Pricing Tables (from rate card) ───────────────────────────────────────

export interface PricingRow {
  slab: string;
  prices: string[];
}

export interface PricingTable {
  id: string;
  title: string;
  validity: string;
  slabLabel: string;
  columns: string[];
  rows: PricingRow[];
  notes?: string[];
}

export const PRICING_TABLES: PricingTable[] = [
  {
    id: 'rent-lease',
    title: 'Rent / Lease / Sub Lease & Running Business — Lease',
    validity: 'Validity: 30 days',
    slabLabel: 'Monthly Rent Slab',
    columns: ['1 Listing', '3 Listings', '5 Listings', '10 Listings', '25 Listings'],
    rows: [
      { slab: 'Below ₹25K',   prices: ['₹2,499',    '₹6,999',    '₹10,999',   '₹19,999',   '₹44,999']    },
      { slab: '₹25K – ₹1L',   prices: ['₹3,999',    '₹10,999',   '₹16,999',   '₹29,999',   '₹69,999']    },
      { slab: '₹1L – ₹3L',    prices: ['₹5,999',    '₹16,999',   '₹26,999',   '₹49,999',   '₹1,09,999']  },
      { slab: '₹3L – ₹10L',   prices: ['₹7,999',    '₹22,999',   '₹36,999',   '₹69,999',   '₹1,59,999']  },
      { slab: '₹10L+',        prices: ['₹9,999',    '₹28,999',   '₹46,999',   '₹89,999',   '₹1,99,999']  },
    ],
    notes: [
      'Default all postings to have 3 days free trial',
      'Sponsored banner ads and others',
    ],
  },
  {
    id: 'sale',
    title: 'Sale / Fractional Sale / Running Business Sale',
    validity: 'Validity: 60 days',
    slabLabel: 'Property Value Slab',
    columns: ['1 Listing', '3 Listings', '5 Listings', '10 Listings', '20 Listings'],
    rows: [
      { slab: 'Below ₹50L',    prices: ['₹6,999',    '₹18,999',   '₹29,999',   '₹55,999',   '₹99,999']    },
      { slab: '₹50L – ₹2Cr',   prices: ['₹9,999',    '₹26,999',   '₹42,999',   '₹79,999',   '₹1,49,999']  },
      { slab: '₹2Cr – ₹10Cr',  prices: ['₹14,999',   '₹41,999',   '₹66,999',   '₹1,19,999', '₹2,29,999']  },
      { slab: '₹10Cr – ₹50Cr', prices: ['₹19,999',   '₹56,999',   '₹89,999',   '₹1,69,999', '₹3,29,999']  },
      { slab: '₹50Cr+',        prices: ['₹24,999',   '₹71,999',   '₹1,14,999', '₹2,19,999', '₹4,29,999']  },
    ],
  },
  {
    id: 'franchise',
    title: 'Franchise Listing Fee',
    validity: 'Validity: 90 days',
    slabLabel: 'Franchise Fee Capacity',
    columns: ['1 Circle', '2 Circles', '2 Circle+', '3 Circles', '3 Circle+', '4 Circles'],
    rows: [
      { slab: '< ₹10L',       prices: ['₹12,000', '₹22,000', '₹30,000', '₹48,000', '₹70,000',   '₹95,000']   },
      { slab: '₹10L – ₹20L',  prices: ['₹15,000', '₹28,000', '₹38,000', '₹60,000', '₹85,000',   '₹1,15,000'] },
      { slab: '₹20L – ₹40L',  prices: ['₹20,000', '₹35,000', '₹48,000', '₹75,000', '₹1,10,000', '₹1,50,000'] },
      { slab: '₹40L – ₹1Cr',  prices: ['₹25,000', '₹45,000', '₹60,000', '₹95,000', '₹1,35,000', '₹1,80,000'] },
      { slab: '₹1Cr+',        prices: ['₹30,000', '₹55,000', '₹75,000', '₹1,15,000','₹1,65,000', '₹2,20,000'] },
    ],
    notes: [
      'Franchisee and others',
    ],
  },
];
