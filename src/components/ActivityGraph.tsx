'use client';

import { Flex, Heading, Text } from '@chakra-ui/react';
import ActivityGraphLineChart from './Charts/ActivityGraphBarChart';
import { ActivityGraphLineChartProps } from '@/types/charts.types';
import { useFilter } from '@/hooks/useFilter';

function ActivityGraph({ ...props }: ActivityGraphLineChartProps) {
  const { period } = useFilter();
  return (
    <Flex datatype="activity-graph" direction="column" gap={4} flex={1}>
      <Flex datatype="activity-graph-head" direction="row" justify="space-between">
        <Heading as={'h2'} size={'md'} w={'full'}>
          Activity Graph
        </Heading>
        <Text whiteSpace={'nowrap'}>
          {period === null
            ? 'Last 7 days'
            : isNaN(Number(period))
            ? new Date(period).toLocaleDateString('en-US')
            : `Last ${period} days`}
        </Text>
      </Flex>
      <Flex
        datatype="activity-graph-body"
        direction="row"
        justify="space-between"
        align="center"
        w={'full'}
        h={'200px'}
      >
        <ActivityGraphLineChart {...props} />
      </Flex>
    </Flex>
  );
}

export default ActivityGraph;
