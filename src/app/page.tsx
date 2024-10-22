import PageTitle from '@/components/PageTitle';
import StatsCard from '@/components/StatsCard';
import { getDashboardCard } from '@/helpers/getDashboardCard';
import { Flex } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <PageTitle title="Dashboard" />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignSelf={'stretch'}
        justify={'space-between'}
        gap={6}
      >
        {getDashboardCard({
          balance: 80,
          lastMonthBalance: 80,
          lastMonthExpense: 10,
          lastMonthIncome: 100,
          totalExpense: 20,
          totalIncome: 100,
        }).map((el) => (
          <StatsCard
            key={el.label}
            label={el.label}
            number={el.number}
            statHelper={el.statHelper}
          />
        ))}
      </Flex>
    </>
  );
}
