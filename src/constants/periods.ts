export const PERIODS: Record<
  'today' | 'last_week' | 'last_3_days',
  { value: string; statsLabel: string; label: string }
> = {
  today: {
    value: 'today',
    statsLabel: 'from yesterday',
    label: 'Today',
  },

  last_3_days: {
    value: 'last_3_days',
    statsLabel: 'from 3 days before',
    label: 'Last 3 days',
  },
  last_week: {
    value: 'last_week',
    statsLabel: 'from a week before',
    label: 'Last week',
  },
};
