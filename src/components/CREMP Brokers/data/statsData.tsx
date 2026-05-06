export interface SummaryStatItem {
  id: string;
  label: string;
  value: string;
  subLabel?: string;
}

export const platformStats: SummaryStatItem[] = [
  { id: 'brokers', label: 'Verified Brokers', value: '128', subLabel: 'Across India' },
  { id: 'sqft', label: 'Sq Ft Transacted', value: '42L+', subLabel: 'Commercial space' },
  { id: 'deals', label: 'Deals Closed', value: '3,200+', subLabel: 'Last 12 months' },
  { id: 'cities', label: 'Cities Covered', value: '18', subLabel: 'Major markets' },
];
