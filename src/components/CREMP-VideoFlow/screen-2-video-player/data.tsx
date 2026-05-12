export { propertyVideos } from '../screen-1-discovery-grid/data';

export interface PlayerMeta {
  videoId: string;
  highlights: string[];
  agentName: string;
  agentAvatarUrl: string;
  propertyType: string;
  leaseStatus: string;
  tenantName?: string;
  carpetArea: string;
}

export const playerMetaMap: Record<string, PlayerMeta> = {
  v1: {
    videoId: 'v1',
    highlights: ['Prime location', 'Grade A construction'],
    agentName: 'PropVest Realty',
    agentAvatarUrl: 'https://ui-avatars.com/api/?name=PR&background=e0e7ff&color=3b82f6',
    propertyType: 'Grade-A Office',
    leaseStatus: 'Pre-Leased',
    tenantName: 'MNC IT Firm',
    carpetArea: '5,000 sq ft',
  },
  v2: {
    videoId: 'v2',
    highlights: ['Low investment', 'Proven brand'],
    agentName: 'Chai Point',
    agentAvatarUrl: 'https://ui-avatars.com/api/?name=CP&background=d1fae5&color=10b981',
    propertyType: 'Franchise',
    leaseStatus: 'Available',
    carpetArea: '800 sq ft',
  },
  v3: {
    videoId: 'v3',
    highlights: ['Grade A asset', 'Excellent connectivity'],
    agentName: 'SquareEdge Advisors',
    agentAvatarUrl: 'https://ui-avatars.com/api/?name=SE&background=e0e7ff&color=3b82f6',
    propertyType: 'Warehouse',
    leaseStatus: 'Pre-Leased',
    tenantName: 'Logistics Aggregator',
    carpetArea: '15,000 sq ft',
  },
}; 