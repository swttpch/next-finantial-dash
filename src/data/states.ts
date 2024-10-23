'use server';

import { envVariables } from '@/utils/env';
import statesJson from './states.json';

type States = {
  [key: string]: string;
};

export const getStateName = async (char: keyof States) => {
  const stateName = statesJson[char as keyof typeof statesJson];
  if (!stateName) {
    throw new Error('Invalid state code');
  }
  return stateName;
};

export const getStates = async () => {
  const states = await fetch(envVariables.NEXT_URL + '/api/states');
  const data = (await states.json()) as string[];
  const refinedData = [];
  for (const el of data) {
    refinedData.push({ value: el, label: await getStateName(el as keyof States) });
  }
  return refinedData;
};
