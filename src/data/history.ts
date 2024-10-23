import { TransactionType } from '@/types/transaction.types';
import { envVariables } from '@/utils/env';

export const getHistoryData = async ({
  page,
  pageSize,
  query,
}: {
  page: number;
  pageSize: number;
  query?: {
    date?: string;
    accounts?: string[];
    industries?: string[];
    states?: string[];
  };
}) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());
  searchParams.set('pagesize', pageSize.toString());
  if (query?.date) {
    searchParams.set('date', query.date);
  }
  if (query?.accounts) {
    query.accounts.forEach((account) => searchParams.append('accounts', account));
  }
  if (query?.industries) {
    query.industries.forEach((industry) => searchParams.append('industries', industry));
  }
  if (query?.states) {
    query.states.forEach((state) => searchParams.append('states', state));
  }

  const url = new URL(envVariables.NEXT_URL + `/api/history` + `?${searchParams.toString()}`);

  const data = await fetch(url, {
    method: 'GET',
    cache: 'force-cache',
  });
  return (await data.json()) as {
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
    data: Array<TransactionType>;
  };
};
