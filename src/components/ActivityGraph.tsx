'use client';

import { Flex, Heading, Text } from '@chakra-ui/react';
import ActivityGraphLineChart from './Charts/ActivityGraphBarChart';
import { ActivityGraphLineChartProps } from '@/types/charts.types';
import { usePeriod } from '@/hooks/usePeriod';

function ActivityGraph({ ...props }: ActivityGraphLineChartProps) {
  const { period } = usePeriod();
  return (
    <Flex datatype="activity-graph" direction="column" gap={4} flex={1}>
      <Flex datatype="activity-graph-head" direction="row" justify="space-between">
        <Heading as={'h2'} size={'md'} w={'full'}>
          Activity Graph
        </Heading>
        <Text whiteSpace={'nowrap'}>Last {period} days</Text>
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
