import { envVariables } from '@/utils/env';

export const getIncomes = async (days: string) => {
  const data = await fetch(envVariables.NEXT_URL + `/api/incomes?days=${days}`, {
    method: 'GET',
    cache: 'force-cache',
  });
  return (await data.json()) as Array<{ value: string; date: string }>;
};
