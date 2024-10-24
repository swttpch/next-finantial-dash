import { getSearchParamsFromFilter } from '@/helpers/getSearchParamsFromFilter';
import { IDefaultFilters } from '@/types/query.types';
import { TransactionType } from '@/types/transaction.types';
import { envVariables } from '@/utils/env';

export const getHistoryData = async ({
  page,
  pageSize,
  query,
}: {
  page: number;
  pageSize: number;
  query?: IDefaultFilters;
}) => {
  const searchParams = getSearchParamsFromFilter(query);
  searchParams.set('page', page.toString());
  searchParams.set('pagesize', pageSize.toString());

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
