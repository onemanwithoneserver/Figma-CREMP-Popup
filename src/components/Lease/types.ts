export type LeaseCategory = 'full-space' | 'sub-lease' | 'co-working';
export type LeaseMarkerType = 'full-space' | 'sub-lease' | 'co-working';

export interface LeaseMarker {
  id: string;
  type: LeaseMarkerType;
  price: string;
  propertyType: string;
  detail: string;
  location: string;
  lat: number;
  lng: number;
}

export interface LeaseProperty {
  id: string;
  tag: LeaseCategory;
  tagLabel: string;
  title: string;
  location: string;
  sizeLabel: string;
  sizeUnit: string;
  price: string;
  imageUrl?: string;
}
