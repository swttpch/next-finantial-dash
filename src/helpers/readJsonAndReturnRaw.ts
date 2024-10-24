import { TransactionType } from '@/types/transaction.types';
import { promises as fs } from 'fs';

export const readJsonAndReturnRaw = async () => {
  const file = await fs.readFile(process.cwd() + '/transactions.json', 'utf8');
  const rawData = JSON.parse(file) as Array<TransactionType>;
  return rawData;
};
