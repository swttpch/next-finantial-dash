import { TransactionType } from '@/types/transaction.types';
import { envVariables } from '@/utils/env';

export const getBalanceData = async () => {
  const data = await fetch(envVariables.NEXT_URL + `/api/balances`, {
    method: 'GET',
    cache: 'force-cache',
  });
  return (await data.json()) as {
    total: string;
    lastMonth: string;
    data: Array<TransactionType>;
  };
};

export const getBalanceByDay = async (days: string) => {
  const data = await fetch(envVariables.NEXT_URL + `/api/balances/by-day?days=${days}`, {
    method: 'GET',
    cache: 'force-cache',
  });
  return (await data.json()) as Array<{ value: string; date: string }>;
};
