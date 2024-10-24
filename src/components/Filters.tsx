'use client';

import { useFilter } from '@/hooks/useFilter';
import { CloseIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Tag, Text, Tooltip } from '@chakra-ui/react';

function Filters({ states }: { states: { value: string; label: string }[] }) {
  const {
    states: curStates,
    clearStates,
    accounts,
    clearAccounts,
    clearIndustries,
    clearPeriod,
    industries,
    period,
  } = useFilter();

  if (
    curStates.length === 0 &&
    accounts.length === 0 &&
    industries.length === 0 &&
    (!period || period === '7')
  ) {
    return null;
  }
  return (
    <Flex gap={2} wrap={'wrap'}>
      <Text>Filters:</Text>
      {curStates.length > 0 && (
        <Tag p={1} gap={'1'} whiteSpace={'pre-wrap'} colorScheme="blue" flex={'1 0 1'}>
          <Text fontWeight={600}>States:</Text>
          <Text fontWeight={400}>
            {curStates
              .map((el) => states.find((innerEl) => innerEl.value === el)?.label || curStates)
              .join(', ')}
          </Text>
          <div />
          <Tooltip label="Clear states filter" aria-label="Clear states filter">
            <IconButton
              size={'xs'}
              variant={'ghost'}
              aria-label="Close"
              icon={<CloseIcon />}
              onClick={clearStates}
            />
          </Tooltip>
        </Tag>
      )}
      {accounts && accounts.length > 0 && (
        <Tag p={1} gap={'1'} whiteSpace={'pre-wrap'} colorScheme="blue" flex={'1 0 1'}>
          <Text fontWeight={600}>Accounts:</Text>
          <Text fontWeight={400}>{accounts.join(', ')}</Text>
          <div />
          <Tooltip label="Clear accounts filter" aria-label="Clear accounts filter">
            <IconButton
              size={'xs'}
              variant={'ghost'}
              aria-label="Close"
              icon={<CloseIcon />}
              onClick={clearAccounts}
            />
          </Tooltip>
        </Tag>
      )}

      {industries && industries.length > 0 && (
        <Tag p={1} gap={'1'} whiteSpace={'pre-wrap'} colorScheme="blue" flex={'1 0 1'}>
          <Text fontWeight={600}>Industries:</Text>
          <Text fontWeight={400}>{industries.join(', ')}</Text>
          <div />
          <Tooltip label="Clear industries filter" aria-label="Clear industries filter">
            <IconButton
              size={'xs'}
              variant={'ghost'}
              aria-label="Close"
              icon={<CloseIcon />}
              onClick={clearIndustries}
            />
          </Tooltip>
        </Tag>
      )}
      {period && period !== '7' && (
        <Tag p={1} gap={'1'} whiteSpace={'pre-wrap'} colorScheme="blue" flex={'1 0 1'}>
          <Text fontWeight={600}>Date:</Text>
          <Text fontWeight={400}>
            {!isNaN(Number(period))
              ? `Last ${period} days`
              : new Date(period).toLocaleDateString('en-US')}
          </Text>
          <div />
          <Tooltip label="Clear period filter" aria-label="Clear period filter">
            <IconButton
              size={'xs'}
              variant={'ghost'}
              aria-label="Close"
              icon={<CloseIcon />}
              onClick={clearPeriod}
            />
          </Tooltip>
        </Tag>
      )}
    </Flex>
  );
}

export default Filters;
