export type MainTab = 'buy' | 'lease' | 'business';

export type CategoryType = 'franchise' | 'existing' | 'distribution' | 'movable';

export type MarkerType = 'franchise' | 'business' | 'movable';

export type ViewMode = 'map' | 'list';

export interface MapMarker {
  id: string;
  type: MarkerType;
  investment: string;
  brandName: string;
  opportunityType: string;
  lat: number; 
  lng: number;
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

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
  isLogo?: boolean;
}

export interface CategoryTab {
  id: CategoryType;
  label: string;
  icon: string;
  color: string;
}

export interface TopTab {
  id: MainTab;
  label: string;
}
