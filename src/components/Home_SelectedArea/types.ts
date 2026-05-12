export type MainTab = 'buy' | 'lease' | 'business';
export type CategoryType = 'franchise' | 'existing' | 'distribution' | 'movable';
export type MarkerType = 'franchise' | 'business' | 'movable';
export type ViewMode = 'map' | 'list';

export interface PolygonPoint {
  x: number; // 0-100 in SVG viewBox space
  y: number;
}

export interface SelectedRegion {
  id: string;
  name: string;
  subLabel: string;
  opportunityCount: number;
  polygonPoints: PolygonPoint[];
}

export interface MapMarker {
  id: string;
  type: MarkerType;
  investment: string;
  brandName: string;
  opportunityType: string;
  lat: number; // % from top
  lng: number; // % from left
}

export interface PropertyDetail {
  id: string;
  tag: string;
  title: string;
  location: string;
  distance: string;
  investment: string;
  area: string;
  category: string;
  imageUrl: string;
  type: CategoryType;
}
