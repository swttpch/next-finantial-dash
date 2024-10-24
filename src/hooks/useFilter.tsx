import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  let period = searchParams.get('period');
  period = period === '' ? '7' : period;
  const industries = searchParams.getAll('industries').filter((el) => el !== '') ?? [];
  const accounts = searchParams.getAll('accounts').filter((el) => el !== '') ?? [];
  const states = searchParams.getAll('states').filter((el) => el !== '') ?? [];

  const clearPeriod = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('period');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearIndustries = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('industries');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearAccounts = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('accounts');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearStates = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('states');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (accounts.length > 0 && accounts[0] === '') {
      clearAccounts();
    }
    if (states.length > 0 && states[0] === '') {
      clearStates();
    }
    if (industries.length > 0 && industries[0] === '') {
      clearIndustries();
    }
  });

  return {
    period,
    accounts,
    industries,
    states,
    clearPeriod,
    clearIndustries,
    clearAccounts,
    clearStates,
  };
};
