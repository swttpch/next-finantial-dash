import { getSearchParamsFromFilter } from '@/helpers/getSearchParamsFromFilter';
import { envVariables } from '@/utils/env';

export const getBalances = async ({
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
  const data = await fetch(envVariables.NEXT_URL + `/api/balances?${searchParams.toString()}`, {
    method: 'GET',
    next: {
      revalidate: 3600,
    },
  });
  return (await data.json()) as Array<{
    value: string;
    date: string;
    expenses: string;
    incomes: string;
    old_balance: string;
  }>;
};

export const getBalancesByDay = async ({
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
    envVariables.NEXT_URL + `/api/balances/by-day?${searchParams.toString()}`,
    {
      method: 'GET',
      next: {
        revalidate: 60,
      },
    },
  );
  return (await data.json()) as Array<{
    value: string;
    date: string;
    expenses: string;
    incomes: string;
    old_balance: string;
  }>;
};
