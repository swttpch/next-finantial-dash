'use client';

import { Flex, Heading, Select } from '@chakra-ui/react';
import ActivityGraphLineChart from './Charts/ActivityGraph';

function ActivityGraph() {
  return (
    <Flex datatype="activity-graph" direction="column" gap={2}>
      <Flex datatype="activity-graph-head" direction="row" justify="space-between">
        <Heading as={'h2'} size={'md'} w={'full'}>
          Activity Graph
        </Heading>
        <Select defaultValue={1} size={'sm'} variant={'flushed'} flex="1 0 1" w={'200px'}>
          <option value={1}>Last month</option>
          <option value={2}>Last 3 months</option>
          <option value={3}>This year</option>
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
        <ActivityGraphLineChart />
      </Flex>
    </Flex>
  );
}

export default ActivityGraph;
