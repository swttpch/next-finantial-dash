import { filterRawData } from '@/helpers/filterRawData';
import { getFiltersFromUrl } from '@/helpers/getFiltersFromUrl';
import { readJsonAndReturnRaw } from '@/helpers/readJsonAndReturnRaw';
import { TransactionType } from '@/types/transaction.types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const pagesize = searchParams.get('pagesize');
  const period = searchParams.get('period');
  const periodValue = period && isNaN(Number(period)) ? period : undefined;
  const pageNumber = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(pagesize as string, 10) || 10;

  const { accounts, industries, states } = getFiltersFromUrl(request.url);
  const rawData = await readJsonAndReturnRaw();

  const filteredData: Array<TransactionType> = filterRawData(rawData, {
    accounts: accounts,
    industries: industries,
    states: states,
    date: periodValue,
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
