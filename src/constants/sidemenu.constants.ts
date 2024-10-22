import { LinkItemProps } from '@/types/common.types';
import { FiHome } from 'react-icons/fi';

export const LINK_ITEMS: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, href: '/' },
  { name: 'Withdraws', icon: FiHome, href: '/withdraws' },
  { name: 'Deposits', icon: FiHome, href: '/deposits' },
  { name: 'History', icon: FiHome, href: '/history' },
];
