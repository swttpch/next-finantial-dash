import { HISTORY_PATH } from '@/constants/paths.constants';
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
} from '@chakra-ui/react';
import Link from 'next/link';

function HomeHistoryTable({ data }: { data: Array<TransactionType> }) {
  return (
    <Flex datatype="history" direction="column" gap={4} flex={{ base: '1', md: '0 0 300px' }}>
      <Flex datatype="activity-graph-head" direction="row" justify="space-between">
        <Heading as={'h2'} size={'md'}>
          History
        </Heading>
        <Link href={HISTORY_PATH}>
          <ChakraLink fontSize={'sm'} as={'span'}>
            View all
          </ChakraLink>
        </Link>
      </Flex>

      <TableContainer data-type="TableContainer">
        <Table size={'sm'} data-type="Table" variant="simple">
          <Tbody data-type="Tbody">
            {data.map((transaction) => (
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
      </TableContainer>
    </Flex>
  );
}

export default HomeHistoryTable;
