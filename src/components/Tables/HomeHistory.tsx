import { HISTORY_PATH } from '@/constants/paths.constants';
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

function HomeHistoryTable() {
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
            <Tr data-type="Tr">
              <Td data-type="Td">
                <Flex direction={'column'} gap={1}>
                  <Text fontSize={'md'}>Company</Text>
                  <Text as={'time'} fontSize={'xx-small'}>
                    {new Date(parseInt('1677110400000')).toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </Text>
                </Flex>
              </Td>
              <Td data-type="Td" isNumeric>
                <Text fontSize={'xl'} color={'green.500'}>
                  +
                  {(Number(1000) * 0.01).toLocaleString('en-US', {
                    style: 'currency',
                    minimumFractionDigits: 2,
                    currency: 'BRL',
                  })}
                </Text>
              </Td>
            </Tr>
            <Tr data-type="Tr">
              <Td data-type="Td">
                <Flex direction={'column'} gap={1}>
                  <Text fontSize={'md'}>Company</Text>
                  <Text as={'time'} fontSize={'xx-small'}>
                    {new Date(parseInt('1677110400000')).toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </Text>
                </Flex>
              </Td>
              <Td data-type="Td" isNumeric>
                <Text fontSize={'xl'} color={'red.500'}>
                  -
                  {(Number(1000) * 0.01).toLocaleString('en-US', {
                    style: 'currency',
                    minimumFractionDigits: 2,
                    currency: 'BRL',
                  })}
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default HomeHistoryTable;
