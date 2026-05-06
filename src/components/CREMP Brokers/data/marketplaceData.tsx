export interface ActionCard {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  icon: string;
  gradient: string;
}

export const actionCards: ActionCard[] = [
  {
    id: 'post',
    title: 'Post Requirement',
    subtitle: 'Get matched with relevant experts',
    cta: 'Post Now →',
    icon: '📋',
    gradient: 'from-[#0a1128] to-[#1a2f5a]',
  },
  {
    id: 'browse',
    title: 'Browse Brokers',
    subtitle: 'Explore and connect directly',
    cta: 'Explore →',
    icon: '🔍',
    gradient: 'from-[#1e3a5f] to-[#2a4f7a]',
  },
];

export const ctaBanner = {
  heading: "Can't find the right expert?",
  subHeading: 'Post your requirement and we\'ll connect you with the best match.',
  cta: 'Post Requirement →',
};
