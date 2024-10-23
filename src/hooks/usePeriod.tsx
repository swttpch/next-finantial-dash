import { redirect, useSearchParams } from 'next/navigation';

export const usePeriod = () => {
  const searchParams = useSearchParams();
  const period = searchParams.get('period') as null | 'today' | 'last_3_days' | 'last_week';

  if (![null, 'today', 'yesterday', 'last_3_days', 'last_week'].includes(period)) {
    throw new Error('Invalid period');
  }

  const setPeriod = (newPeriod: 'today' | 'last_3_days' | 'last_week') => {
    const params = new URLSearchParams(searchParams);
    params.set('period', newPeriod);
    redirect(`?${params.toString()}`);
  };

  return { period: period ?? 'today', setPeriod };
};
