import { TransactionType } from '@/types/transaction.types';
import { promises as fs } from 'fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const pagesize = searchParams.get('pagesize');
  const date = searchParams.get('date');
  const accounts = searchParams.getAll('accounts');
  const industries = searchParams.getAll('industries');
  const states = searchParams.getAll('states');

  const pageNumber = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(pagesize as string, 10) || 10;
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

  const data = {
    pagination: {
      page: pageNumber,
      pageSize: pageSize,
      totalItems: filteredData.length,
      totalPages: Math.ceil(filteredData.length / pageSize),
    },
    data: filteredData
      .sort((a, b) => b.date - a.date)
      .slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
  };

  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
