'use client';
import { HISTORY_PATH } from '@/constants/paths.constants';
import { usePagination } from '@/hooks/usePagination';
import { TransactionType } from '@/types/transaction.types';
import {
  Flex,
  Heading,
  Link as ChakraLink,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Text,
  IconButton,
  Select,
  Tooltip,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from '@chakra-ui/icons';

function HomeHistoryTable({
  data,
}: {
  data: {
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
    data: Array<TransactionType>;
  };
}) {
  const { page, pagesize, setPageIndex, setPageSize } = usePagination();

  return (
    <Flex datatype="history" direction="column" gap={4} flex={{ base: '1', md: '0 0 300px' }}>
      <Flex datatype="activity-graph-head" direction="row" justify="space-between">
        <Heading as={'h2'} size={'md'}>
          History
        </Heading>
      </Flex>

      <TableContainer data-type="TableContainer">
        <Table size={'sm'} data-type="Table" variant="simple">
          <Tbody data-type="Tbody">
            {data.data.map((transaction) => (
              <Tr key={transaction.date} data-type="Tr">
                <Td data-type="Td">
                  <Flex direction={'column'} gap={1}>
                    <Text fontSize={'md'}>{transaction.account}</Text>
                    <Text as={'time'} fontSize={'xx-small'}>
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                      })}
                    </Text>
                  </Flex>
                </Td>
                <Td data-type="Td" isNumeric>
                  <Text
                    fontSize={'xl'}
                    color={transaction.transaction_type === 'deposit' ? 'green.500' : 'red.500'}
                  >
                    {transaction.transaction_type === 'deposit' ? '+' : '-'}
                    {(Number(transaction.amount) * 0.01).toLocaleString('en-US', {
                      style: 'currency',
                      minimumFractionDigits: 2,
                      currency: 'BRL',
                    })}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex
          display={{ base: 'none', md: 'flex' }}
          justifyContent="space-between"
          m={4}
          alignItems="center"
        >
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                aria-label="First Page"
                onClick={() => setPageIndex(1)}
                isDisabled={page === 1}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                aria-label="Previous Page"
                onClick={() => setPageIndex(page - 1)}
                isDisabled={page === 1}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{' '}
              <Text fontWeight="bold" as="span">
                {page}
              </Text>{' '}
              of{' '}
              <Text fontWeight="bold" as="span">
                {data.pagination.totalPages}
              </Text>
            </Text>

            <Select
              w={32}
              value={pagesize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                aria-label="Next Page"
                onClick={() => setPageIndex(page + 1)}
                isDisabled={!data.pagination.totalPages || page === data.pagination.totalPages}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                aria-label="Last Page"
                onClick={() => setPageIndex(data.pagination.totalPages)}
                isDisabled={!data.pagination.totalPages || page === data.pagination.totalPages}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
        <Flex
          display={{ base: 'flex', md: 'none' }}
          justifyContent="space-between"
          m={4}
          alignItems="center"
          direction={'column'}
          gap={4}
        >
          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{' '}
              <Text fontWeight="bold" as="span">
                {page}
              </Text>{' '}
              of{' '}
              <Text fontWeight="bold" as="span">
                {data.pagination.totalPages}
              </Text>
            </Text>

            <Select
              w={32}
              value={pagesize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex justify={'center'} alignSelf={'stretch'} gap={10}>
            <Flex>
              <Tooltip label="First Page">
                <IconButton
                  aria-label="First Page"
                  onClick={() => setPageIndex(1)}
                  isDisabled={page === 1}
                  icon={<ArrowLeftIcon h={3} w={3} />}
                  mr={4}
                />
              </Tooltip>
              <Tooltip label="Previous Page">
                <IconButton
                  aria-label="Previous Page"
                  onClick={() => setPageIndex(page - 1)}
                  isDisabled={page === 1}
                  icon={<ChevronLeftIcon h={6} w={6} />}
                />
              </Tooltip>
            </Flex>
            <Flex>
              <Tooltip label="Next Page">
                <IconButton
                  aria-label="Next Page"
                  onClick={() => setPageIndex(page + 1)}
                  isDisabled={!data.pagination.totalPages || page === data.pagination.totalPages}
                  icon={<ChevronRightIcon h={6} w={6} />}
                />
              </Tooltip>
              <Tooltip label="Last Page">
                <IconButton
                  aria-label="Last Page"
                  onClick={() => setPageIndex(data.pagination.totalPages)}
                  isDisabled={!data.pagination.totalPages || page === data.pagination.totalPages}
                  icon={<ArrowRightIcon h={3} w={3} />}
                  ml={4}
                />
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </TableContainer>
    </Flex>
  );
}

export default HomeHistoryTable;
