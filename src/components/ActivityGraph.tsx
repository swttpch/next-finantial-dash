'use client';

import { Flex, Heading, Text } from '@chakra-ui/react';

interface ActivityGraphLineChartProps {
  incomesColor: string;
  expensesColor: string;
}

function ActivityGraph({ incomesColor, expensesColor }: ActivityGraphLineChartProps) {
  return (
    <Flex datatype="activity-graph" direction="column" gap={4} flex={1}>
      <Flex datatype="activity-graph-head" direction="row" justify="space-between">
        <Heading as={'h2'} size={'md'} w={'full'}>
          Activity Graph
        </Heading>
        <Text whiteSpace={'nowrap'}>Last 7 days</Text>
      </Flex>
      <Flex
        datatype="activity-graph-body"
        direction="row"
        justify="space-between"
        align="center"
        w={'full'}
        h={'200px'}
      >
        {/* <ActivityGraphLineChart
          incomes={incomes}
          expenses={expenses}
          incomesColor={incomesColor}
          expensesColor={expensesColor}
        /> */}
      </Flex>
    </Flex>
  );
}

export default ActivityGraph;
