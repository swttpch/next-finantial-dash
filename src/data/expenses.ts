import { getSearchParamsFromFilter } from '@/helpers/getSearchParamsFromFilter';
import { envVariables } from '@/utils/env';

export const getExpenses = async ({
  period,
  accounts,
  industries,
  states,
}: {
  period?: string;
  accounts?: string[];
  industries?: string[];
  states?: string[];
}) => {
  const searchParams = getSearchParamsFromFilter({ date: period, accounts, industries, states });
  const data = await fetch(envVariables.NEXT_URL + `/api/expenses?${searchParams.toString()}`, {
    method: 'GET',
    cache: 'force-cache',
  });
  return (await data.json()) as Array<{ value: string; date: string }>;
};

export const getExpensesByDay = async ({
  period,
  accounts,
  industries,
  states,
}: {
  period?: string;
  accounts?: string[];
  industries?: string[];
  states?: string[];
}) => {
  const searchParams = getSearchParamsFromFilter({ date: period, accounts, industries, states });
  const data = await fetch(
    envVariables.NEXT_URL + `/api/expenses/by-day?${searchParams.toString()}`,
    {
      method: 'GET',
      cache: 'force-cache',
    },
  );
  return (await data.json()) as Array<{ value: string; date: string }>;
};
