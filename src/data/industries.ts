'use server';

import { envVariables } from '@/utils/env';

export const getIndustries = async () => {
  const industries = await fetch(envVariables.NEXT_URL + '/api/industries', {
    method: 'GET',
    cache: 'force-cache',
  });
  const data = (await industries.json()) as string[];
  return data.map((el) => ({ value: el, label: el }));
};
