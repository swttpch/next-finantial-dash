import { redirect, useSearchParams, useRouter } from 'next/navigation';

export const useFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const period = searchParams.get('period') ?? '7';
  const industries = searchParams.getAll('industries') ?? [];
  const accounts = searchParams.getAll('accounts') ?? [];
  const states = searchParams.getAll('states') ?? [];

  const setFilters = (newFilters: {
    industries?: string[];
    accounts?: string[];
    states?: string[];
    period?: string;
  }) => {
    const params = new URLSearchParams(searchParams);
    params.delete('industries');
    params.delete('accounts');
    params.delete('states');
    params.delete('period');
    if (newFilters.period) params.set('period', newFilters.period);

    if (newFilters.industries) {
      for (const industry of newFilters.industries) {
        params.append('industries', industry);
      }
    }
    if (newFilters.accounts) {
      for (const account of newFilters.accounts) {
        params.append('accounts', account);
      }
    }
    if (newFilters.states) {
      for (const state of newFilters.states) {
        params.append('states', state);
      }
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { period, accounts, industries, states, setFilters };
};
