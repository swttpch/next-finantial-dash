import { LinkItemProps } from '@/types/common.types';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from 'react-icons/fi';

export const LINK_ITEMS: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];
