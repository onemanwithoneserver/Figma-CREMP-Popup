import type { FilterGroup } from '../types/broker.types';

export const filterGroups: FilterGroup[] = [
  {
    id: 'specialties',
    label: 'Property Expertise',
    type: 'multi',
    options: [
      { id: 'Office', label: 'Office' },
      { id: 'Retail', label: 'Retail' },
      { id: 'Industrial', label: 'Industrial' },
      { id: 'Warehouse', label: 'Warehouse' },
      { id: 'Land', label: 'Land' },
      { id: 'Investment', label: 'Investment' },
      { id: 'Co-working', label: 'Co-working' },
      { id: 'Mixed Use', label: 'Mixed Use' },
    ],
  },
  {
    id: 'locations',
    label: 'Location',
    type: 'multi',
    options: [
      { id: 'Hyderabad', label: 'HITEC City' },
      { id: 'Mumbai', label: 'BKC' },
      { id: 'Bengaluru', label: 'Whitefield' },
      { id: 'Delhi', label: 'Connaught Place' },
      { id: 'Pune', label: 'Hinjewadi' },
      { id: 'Chennai', label: 'OMR' },
      { id: 'Gachibowli', label: 'Gachibowli' },
      { id: 'Koramangala', label: 'Koramangala' },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    type: 'single',
    options: [
      { id: '0-3', label: '0–3 Years' },
      { id: '3-5', label: '3–5 Years' },
      { id: '5-10', label: '5–10 Years' },
      { id: '10+', label: '10+ Years' },
    ],
  },
  {
    id: 'rating',
    label: 'Min Rating',
    type: 'single',
    options: [
      { id: '4.5', label: '4.5 & above' },
      { id: '4.0', label: '4.0 & above' },
      { id: '3.5', label: '3.5 & above' },
    ],
  },
  {
    id: 'dealType',
    label: 'Deal Type',
    type: 'multi',
    options: [
      { id: 'Sale', label: 'Sale' },
      { id: 'Leasing', label: 'Leasing' },
      { id: 'Investment', label: 'Investment' },
      { id: 'Pre-leased', label: 'Pre-leased' },
    ],
  },
  {
    id: 'dealSize',
    label: 'Deal Size Range',
    type: 'multi',
    options: [
      { id: 'under-50l', label: 'Under ₹50L' },
      { id: '50l-2cr', label: '₹50L – ₹2Cr' },
      { id: '2cr-10cr', label: '₹2Cr – ₹10Cr' },
      { id: '10cr-50cr', label: '₹10Cr – ₹50Cr' },
      { id: '50cr+', label: '₹50Cr+' },
    ],
  },
];

export const sortOptions: { id: string; label: string }[] = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'experience-high', label: 'Experience: High to Low' },
  { id: 'deals-high', label: 'Deals Closed: High to Low' },
  { id: 'rating-high', label: 'Rating: High to Low' },
  { id: 'recent', label: 'Recently Active' },
];

