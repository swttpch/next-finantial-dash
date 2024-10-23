import { TransactionType } from '@/types/transaction.types';
import { envVariables } from '@/utils/env';

export const getExpensesData = async () => {
  const data = await fetch(envVariables.NEXT_URL + `/api/expenses`, {
    method: 'GET',
    cache: 'force-cache',
  });
  return (await data.json()) as {
    total: string;
    lastMonth: string;
    data: Array<TransactionType>;
  };
};
