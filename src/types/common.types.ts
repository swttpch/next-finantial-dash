import { IconType } from 'react-icons';
import { TransactionType } from './transaction.types';

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
    isReverse?: boolean;
  };
  primaryColor: string;
  secondaryColor: string;
  data: Array<{ value: string; date: string }>;
}
