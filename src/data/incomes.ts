import { TransactionType } from '@/types/transaction.types';
import { envVariables } from '@/utils/env';

export const getIncomesData = async () => {
  const data = await fetch(envVariables.NEXT_URL + `/api/incomes`, {
    method: 'GET',
    cache: 'force-cache',
  });
  return (await data.json()) as {
    total: string;
    lastMonth: string;
    data: Array<TransactionType>;
  };
};
