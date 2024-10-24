import { filterRawData } from '@/helpers/filterRawData';
import { readJsonAndReturnRaw } from '@/helpers/readJsonAndReturnRaw';
import { TransactionType } from '@/types/transaction.types';

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const rawData = await readJsonAndReturnRaw();
  const filteredData = filterRawData(rawData, {
    accounts: searchParams.getAll('accounts'),
    industries: searchParams.getAll('industries'),
    states: searchParams.getAll('states'),
    date: searchParams.get('period') || undefined,
  });
  const transactionsByDay = filteredData
    .sort((a, b) => a.date - b.date)
    .reduce((acc, transaction) => {
      if (transaction.transaction_type === 'deposit') {
        return acc;
      }
      const date = new Date(transaction.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {} as Record<string, TransactionType[]>);

  const responseData = Object.keys(transactionsByDay).reduce((acc, cur) => {
    const total = transactionsByDay[cur].reduce((acc, cur) => (acc += Number(cur.amount)), 0);
    acc.push({ value: total.toString(), date: cur });
    return acc;
  }, [] as Array<{ value: string; date: string }>);

  return new Response(JSON.stringify(responseData), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
