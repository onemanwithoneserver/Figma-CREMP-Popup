import type { TopTab, CategoryTab, MapMarker, PropertyDetail } from './types';

export const topTabs: TopTab[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'lease', label: 'Lease' },
  { id: 'business', label: 'Business Opportunities' },
];

export const categoryTabs: CategoryTab[] = [
  {
    id: 'franchise',
    label: 'New Franchise',
    icon: 'store',
    color: '#7C3AED',
  },
  {
    id: 'existing',
    label: 'Existing Business',
    icon: 'storefront',
    color: '#16A34A',
  },
  {
    id: 'distribution',
    label: 'Distribution Opportunities',
    icon: 'local_shipping',
    color: '#EA580C',
  },
  {
    id: 'movable',
    label: 'Movable Assets',
    icon: 'shopping_cart',
    color: '#D97706',
  },
];

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
    lng: 72,
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
    lng: 70,
  },
  {
    id: '7',
    type: 'movable',
    investment: '₹ 12 L',
    brandName: 'Food Truck',
    opportunityType: '(Movable)',
    lat: 76,
    lng: 8,
  },
];

export const featuredProperty: PropertyDetail = {
  id: 'prop-1',
  tag: 'New Franchise',
  title: 'Chai Point Franchise',
  location: 'Madhapur, Hyderabad',
  distance: '0.8 km from you',
  investment: '₹ 18 L',
  area: '250 – 500 sq.ft',
  category: 'Food & Beverage',
  imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
  type: 'franchise',
};

export const mapLabels = [
  { label: 'MADHAPUR', top: 18, left: 30 },
  { label: 'KUKATPALLY', top: 10, left: 72 },
  { label: 'KOMPALLY', top: 42, left: 82 },
  { label: 'GACHIBOWLI', top: 46, left: 2 },
  { label: 'JUBILEE HILLS', top: 64, left: 34 },
  { label: 'FINANCIAL DISTRICT', top: 76, left: 2 },
  { label: 'BANJARA HILLS', top: 82, left: 42 },
  { label: 'LB NAGAR', top: 82, left: 74 },
];

export const roadPaths = [
  // ORR left
  { x1: 5, y1: 10, x2: 5, y2: 90 },
  // ORR top
  { x1: 5, y1: 10, x2: 95, y2: 10 },
  // ORR right
  { x1: 95, y1: 10, x2: 95, y2: 90 },
  // inner road diagonal
  { x1: 20, y1: 20, x2: 80, y2: 75 },
  // horizontal road
  { x1: 5, y1: 50, x2: 95, y2: 50 },
  // vertical center
  { x1: 48, y1: 10, x2: 52, y2: 90 },
];
