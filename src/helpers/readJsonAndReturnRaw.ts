import { TransactionType } from '@/types/transaction.types';
import transactionJson from '@/data/transactions.json';

export const readJsonAndReturnRaw = async () => {
  const rawData = transactionJson as Array<TransactionType>;
  return rawData;
};
