import { redirect, useSearchParams, useRouter } from 'next/navigation';

export const useFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const period = searchParams.get('period') ?? '7';
  if (isNaN(Number(period))) {
    throw new Error('Invalid period');
  }
  const setPeriod = (newPeriod: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('period', newPeriod);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { period: period ?? '7', setPeriod };
};
