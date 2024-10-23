import { CURRENT_TIME } from '@/constants/common';
import { getCurrencyValue } from '@/helpers/getCurrencyValue';
import { TransactionType } from '@/types/transaction.types';
import { promises as fs } from 'fs';
// TODO: add cache control
export async function GET(request: Request) {
  const file = await fs.readFile(process.cwd() + '/transactions.json', 'utf8');
  const currentMonth = new Date(CURRENT_TIME).getMonth();
  const currentYear = new Date(CURRENT_TIME).getFullYear();

  const data = (JSON.parse(file) as Array<TransactionType>).filter((transaction) => {
    if (transaction.transaction_type === 'withdraw') {
      return false;
    }
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getDate() === new Date(CURRENT_TIME).getDate() &&
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });
  const beforeData = (JSON.parse(file) as Array<TransactionType>).filter((transaction) => {
    if (transaction.transaction_type === 'withdraw') {
      return false;
    }
    const transactionDate = new Date(transaction.date);
    const yesterday = new Date(CURRENT_TIME);
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      transactionDate.getDate() === yesterday.getDate() &&
      transactionDate.getMonth() === yesterday.getMonth() &&
      transactionDate.getFullYear() === yesterday.getFullYear()
    );
  });

  return new Response(
    JSON.stringify({
      total: data.reduce((acc, cur) => (acc += getCurrencyValue(cur.amount)), 0).toString(),
      lastMonth: beforeData
        .reduce((acc, cur) => (acc += getCurrencyValue(cur.amount)), 0)
        .toString(),
      data: data.sort((a, b) => {
        return b.date - a.date;
      }),
      beforeData: beforeData.sort((a, b) => {
        return b.date - a.date;
      }),
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
      statusText: 'OK',
    },
  );
}
