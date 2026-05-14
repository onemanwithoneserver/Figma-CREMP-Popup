import type {
  SelectedRegion,
  MapMarker,
  PropertyDetail,
} from './types';

// ── Selected polygon region ──────────────────────────────────────────────────
// Points trace an organic boundary covering Madhapur → Kukatpally →
// Kompally → LB Nagar → Jubilee Hills → Financial District loop
export const selectedRegion: SelectedRegion = {
  id: 'hyderabad-central',
  name: 'Central Hyderabad',
  subLabel: 'Madhapur · Jubilee Hills · Kukatpally',
  opportunityCount: 48,
  polygonPoints: [
    { x: 28, y: 6 },
    { x: 52, y: 4 },
    { x: 72, y: 8 },
    { x: 84, y: 20 },
    { x: 88, y: 44 },
    { x: 82, y: 64 },
    { x: 68, y: 78 },
    { x: 50, y: 86 },
    { x: 32, y: 84 },
    { x: 16, y: 76 },
    { x: 8,  y: 60 },
    { x: 8,  y: 38 },
    { x: 16, y: 18 },
    { x: 28, y: 6 },
  ],
};

// ── Map markers ──────────────────────────────────────────────────────────────
export const mapMarkers: MapMarker[] = [
  {
    id: '1',
    type: 'franchise',
    investment: '₹ 18 L',
    brandName: 'Chai Point',
    opportunityType: 'Franchise',
    lat: 28,
    lng: 28,
  },
  {
    id: '2',
    type: 'business',
    investment: '₹ 42 L',
    brandName: 'QSR Brand',
    opportunityType: 'Franchise',
    lat: 34,
    lng: 46,
  },
  {
    id: '3',
    type: 'franchise',
    investment: '₹ 25 L',
    brandName: 'Salon Brand',
    opportunityType: 'Franchise',
    lat: 26,
    lng: 62,
  },
  {
    id: '4',
    type: 'business',
    investment: '₹ 35 L',
    brandName: 'Education Brand',
    opportunityType: 'Franchise',
    lat: 46,
    lng: 28,
  },
  {
    id: '5',
    type: 'franchise',
    investment: '₹ 50 L',
    brandName: 'EV Charging',
    opportunityType: 'Franchise',
    lat: 56,
    lng: 40,
  },
  {
    id: '6',
    type: 'business',
    investment: '₹ 22 L',
    brandName: 'Gym Brand',
    opportunityType: 'Franchise',
    lat: 50,
    lng: 63,
  },
  {
    id: '7',
    type: 'movable',
    investment: '₹ 12 L',
    brandName: 'Food Truck',
    opportunityType: '(Movable)',
    lat: 68,
    lng: 30,
  },
];

// ── Featured property card ───────────────────────────────────────────────────
export const featuredProperty: PropertyDetail = {
  id: 'prop-1',
  tag: 'New Franchise',
  title: 'Chai Point Franchise',
  location: 'Madhapur, Hyderabad',
  distance: '0.8 km from you',
  investment: '₹ 18 L',
  area: '250 – 500 sq.ft',
  category: 'Food & Beverage',
  imageUrl:
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
  type: 'franchise',
};

// ── Map labels ───────────────────────────────────────────────────────────────
export const mapLabels = [
  { label: 'MADHAPUR',          top: 29, left: 32 },
  { label: 'KUKATPALLY',        top: 27, left: 62 },
  { label: 'KOMPALLY',          top: 40, left: 68 },
  { label: 'GACHIBOWLI',        top: 44, left: 28 },
  { label: 'JUBILEE HILLS',     top: 60, left: 36 },
  { label: 'FINANCIAL DISTRICT',top: 68, left: 28 },
  { label: 'BANJARA HILLS',     top: 65, left: 44 },
  { label: 'LB NAGAR',          top: 67, left: 64 },
];

// ── Category tabs (for reuse) ─────────────────────────────────────────────────
export const categoryTabs = [
  { id: 'franchise'    as const, label: 'New Franchise',              color: '#7C3AED' },
  { id: 'existing'     as const, label: 'Existing Business',          color: '#16A34A' },
  { id: 'distribution' as const, label: 'Distribution Opportunities', color: '#EA580C' },
  { id: 'movable'      as const, label: 'Movable Assets',             color: '#D97706' },
];

// ── Top tabs ──────────────────────────────────────────────────────────────────
export const topTabs = [
  { id: 'buy'      as const, label: 'Buy'                   },
  { id: 'lease'    as const, label: 'Lease'                 },
  { id: 'business' as const, label: 'Business Opportunities'},
];
