'use client';

import { Flex, Heading, Select } from '@chakra-ui/react';
import ActivityGraphLineChart from './Charts/ActivityGraphLineChart';
import { PERIODS } from '@/constants/periods';
import { usePeriod } from '@/hooks/usePeriod';
import { TransactionType } from '@/types/transaction.types';

interface ActivityGraphLineChartProps {
  incomes: Array<TransactionType>;
  incomesColor: string;
  expenses: Array<TransactionType>;
  expensesColor: string;
}

function ActivityGraph({
  incomes,
  expenses,
  incomesColor,
  expensesColor,
}: ActivityGraphLineChartProps) {
  const { period, setPeriod } = usePeriod();
  return (
    <Flex datatype="activity-graph" direction="column" gap={2} flex={1}>
      <Flex datatype="activity-graph-head" direction="row" justify="space-between">
        <Heading as={'h2'} size={'md'} w={'full'}>
          Activity Graph
        </Heading>
        <Select
          onChange={(e) => setPeriod(e.target.value as 'today')}
          value={period}
          size={'sm'}
          variant={'flushed'}
          flex="1 0 1"
          w={'200px'}
        >
          {Object.values(PERIODS).map((el) => {
            return (
              <option key={el.value} value={el.value}>
                {el.label}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Flex
        datatype="activity-graph-body"
        direction="row"
        justify="space-between"
        align="center"
        w={'full'}
        h={'200px'}
      >
        <ActivityGraphLineChart
          incomes={incomes}
          expenses={expenses}
          incomesColor={incomesColor}
          expensesColor={expensesColor}
        />
      </Flex>
    </Flex>
  );
}

export default ActivityGraph;
