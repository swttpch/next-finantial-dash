import { usePeriod } from '@/hooks/usePeriod';
import { TransactionType } from '@/types/transaction.types';
import { envVariables } from '@/utils/env';

export const getIncomesData = async (period: 'today' | 'last_3_days' | 'last_week' = 'today') => {
  const data = await fetch(envVariables.NEXT_URL + `/api/incomes?period=${period}`, {
    method: 'GET',
    cache: 'force-cache',
  });
  return (await data.json()) as {
    total: string;
    lastMonth: string;
    data: Array<TransactionType>;
  };
};
