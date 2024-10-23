'use server';

import { envVariables } from '@/utils/env';

export const getAccounts = async () => {
  const accounts = await fetch(envVariables.NEXT_URL + '/api/accounts');
  const data = (await accounts.json()) as string[];
  return data.map((el) => ({ value: el, label: el }));
};
