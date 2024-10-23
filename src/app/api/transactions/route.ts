import { TransactionType } from '@/types/transaction.types';
import { promises as fs } from 'fs';
// TODO: add cache control
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const accounts = searchParams.getAll('accounts');
  const industries = searchParams.getAll('industries');
  const states = searchParams.getAll('states');

  const dateFilter = date ? new Date(date as string) : null;
  const accountList = Array.isArray(accounts) ? accounts : [accounts];
  const industryList = Array.isArray(industries) ? industries : [industries];
  const stateList = Array.isArray(states) ? states : [states];

  const file = await fs.readFile(process.cwd() + '/transactions.json', 'utf8');
  let filteredData: Array<TransactionType> = [];
  const rawData = JSON.parse(file) as Array<TransactionType>;

  rawData.forEach((transaction) => {
    if (accountList.length > 0 && !accountList.includes(transaction.account)) {
      return;
    }
    if (industryList.length > 0 && !industryList.includes(transaction.industry)) {
      return;
    }
    if (stateList.length > 0 && !stateList.includes(transaction.state)) {
      return;
    }
    if (dateFilter && new Date(transaction.date).getTime() !== dateFilter.getTime()) {
      return;
    }
    filteredData.push(transaction);
  });

  return new Response(JSON.stringify(filteredData), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
