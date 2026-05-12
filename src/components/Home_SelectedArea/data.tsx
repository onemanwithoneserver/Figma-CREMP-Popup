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
    lat: 22,
    lng: 14,
  },
  {
    id: '2',
    type: 'business',
    investment: '₹ 42 L',
    brandName: 'QSR Brand',
    opportunityType: 'Franchise',
    lat: 32,
    lng: 37,
  },
  {
    id: '3',
    type: 'franchise',
    investment: '₹ 25 L',
    brandName: 'Salon Brand',
    opportunityType: 'Franchise',
    lat: 18,
    lng: 62,
  },
  {
    id: '4',
    type: 'business',
    investment: '₹ 35 L',
    brandName: 'Education Brand',
    opportunityType: 'Franchise',
    lat: 46,
    lng: 10,
  },
  {
    id: '5',
    type: 'franchise',
    investment: '₹ 50 L',
    brandName: 'EV Charging',
    opportunityType: 'Franchise',
    lat: 56,
    lng: 38,
  },
  {
    id: '6',
    type: 'business',
    investment: '₹ 22 L',
    brandName: 'Gym Brand',
    opportunityType: 'Franchise',
    lat: 52,
    lng: 66,
  },
  {
    id: '7',
    type: 'movable',
    investment: '₹ 12 L',
    brandName: 'Food Truck',
    opportunityType: '(Movable)',
    lat: 74,
    lng: 8,
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
  { label: 'MADHAPUR',          top: 18, left: 30 },
  { label: 'KUKATPALLY',        top: 10, left: 62 },
  { label: 'KOMPALLY',          top: 42, left: 76 },
  { label: 'GACHIBOWLI',        top: 46, left: 2  },
  { label: 'JUBILEE HILLS',     top: 62, left: 34 },
  { label: 'FINANCIAL DISTRICT',top: 74, left: 2  },
  { label: 'BANJARA HILLS',     top: 80, left: 42 },
  { label: 'LB NAGAR',          top: 80, left: 70 },
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
