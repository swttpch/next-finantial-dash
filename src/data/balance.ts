import { envVariables } from '@/utils/env';

export const getBalances = async (days: string) => {
  const data = await fetch(envVariables.NEXT_URL + `/api/balances?days=${days}`, {
    method: 'GET',
    cache: 'force-cache',
  });
  return (await data.json()) as Array<{
    value: string;
    date: string;
    expenses: string;
    incomes: string;
    old_balance: string;
  }>;
};
