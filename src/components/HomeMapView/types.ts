export type MainTab = 'buy' | 'lease' | 'business';

export type PropertyCategory = 'vacant' | 'fractional' | 'preleased' | 'all';

export interface PropertyListing {
  id: string;
  price: string;
  priceUnit: string;
  type: string;
  area: string;
  areaUnit: string;
  location: string;
  imageUrl?: string;
  markerType: 'retail' | 'office' | 'warehouse' | 'showroom' | 'plot' | 'movable';
  /** position on the mock map: 0-100 percent */
  lat: number;
  lng: number;
  premium?: boolean;
}
