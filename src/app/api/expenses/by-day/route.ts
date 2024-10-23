import { TransactionType } from '@/types/transaction.types';
import { promises as fs } from 'fs';
// TODO: add cache control
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const days = searchParams.get('days');
  const file = await fs.readFile(process.cwd() + '/transactions.json', 'utf8');
  const rawData = JSON.parse(file) as Array<TransactionType>;

  const transactionsByDay = rawData
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
  const slicedData = responseData.slice(
    responseData.length - Number(days ?? responseData.length),
    responseData.length,
  );
  return new Response(JSON.stringify(slicedData), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
