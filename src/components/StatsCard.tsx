'use client';

import { StatsCardProps } from '@/types/common.types';
import { Card, CardBody, Flex, Stat, StatArrow, StatLabel, Text, useToken } from '@chakra-ui/react';

import SimpleLineChart from './Charts/SimpleLineChart';
function StatsCard({
  label,
  number,
  statHelper,
  secondaryColor,
  primaryColor,
  data,
}: StatsCardProps) {
  const tokenColor = useToken('colors', primaryColor);
  return (
    <>
      <Card data-type="Card" overflow="hidden" flex={1} bgColor={secondaryColor}>
        <CardBody data-type="CardBody">
          <Stat data-type="Stat">
            <StatLabel data-type="StatLabel">{label}</StatLabel>
            <Flex
              direction={'row'}
              alignSelf={'stretch'}
              align={'center'}
              justify={'space-between'}
            >
              <Text fontSize={'xl'} fontWeight={'bold'} data-type="StatNumber">
                {number}
              </Text>
              {statHelper && (
                <Flex direction={'column'} align={'center'}>
                  <Text fontSize={'sm'} data-type="StatHelpText">
                    <StatArrow
                      transform={statHelper.isReverse ? 'rotate(180deg)' : 'none'}
                      data-type="StatArrow"
                      type={statHelper.type}
                    ></StatArrow>
                    {statHelper.value}
                  </Text>
                  <Text fontSize={'xx-small'} data-type="StatHelpText">
                    {statHelper.from}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Stat>
          {data.length > 0 && (
            <SimpleLineChart chartColor={tokenColor} height={'70px'} data={data} />
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default StatsCard;
