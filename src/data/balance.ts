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
