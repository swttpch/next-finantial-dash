'use client';

import { usePeriod } from '@/hooks/usePeriod';
import { Select } from '@chakra-ui/react';
import { redirect, useSearchParams } from 'next/navigation';

function SelectPeriod() {
  const { period, setPeriod } = usePeriod();

  return (
    <Select
      value={[`7`, '15', '30'].includes(period) ? period : 'custom'}
      onChange={(v) => setPeriod(v.target.value)}
    >
      <option value="7">Last 7 days</option>
      <option value="15">Last 15 days</option>
      <option value="30">Last 30 days</option>
      {[`7`, '15', '30'].includes(period) ? null : <option value="custom">Custom</option>}
    </Select>
  );
}

export default SelectPeriod;
