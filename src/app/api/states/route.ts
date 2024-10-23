import { TransactionType } from '@/types/transaction.types';
import { promises as fs } from 'fs';
// TODO: add cache control
export async function GET(request: Request) {
  const file = await fs.readFile(process.cwd() + '/transactions.json', 'utf8');
  const rawData = JSON.parse(file) as Array<TransactionType>;

  const allStates = rawData.reduce((acc, cur) => {
    if (!acc.includes(cur.state)) {
      acc.push(cur.state);
    }
    return acc;
  }, [] as string[]);

  return new Response(JSON.stringify(allStates), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
