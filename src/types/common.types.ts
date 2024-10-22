import { IconType } from 'react-icons';

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

export interface StatsCardProps {
  label: string;
  number: string;
  statHelper?: {
    type: 'increase' | 'decrease';
    value: string;
    from?: string;
  };
  primaryColor: string;
  secondaryColor: string;
}
