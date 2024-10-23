import ActivityGraph from '@/components/ActivityGraph';
import PageTitle from '@/components/PageTitle';
import StatsCard from '@/components/StatsCard';
import HomeHistoryTable from '@/components/Tables/HomeHistory';
import { getBalanceData } from '@/data/balance';
import { getExpensesData } from '@/data/expenses';
import { getIncomesData } from '@/data/incomes';
import { getDashboardCard } from '@/helpers/getDashboardCard';
import { Flex } from '@chakra-ui/react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const balances = await getBalanceData();
  const expenses = await getExpensesData();
  const incomes = await getIncomesData();
  return (
    <>
      <PageTitle title="Summary" />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignSelf={'stretch'}
        justify={'space-between'}
        gap={6}
      >
        {getDashboardCard({
          balance: balances.total,
          lastMonthBalance: balances.lastMonth,
          lastMonthExpense: expenses.lastMonth,
          lastMonthIncome: incomes.lastMonth,
          totalExpense: expenses.total,
          totalIncome: incomes.total,
          balances: balances.data,
          incomes: incomes.data,
          expenses: expenses.data,
        }).map((el) => (
          <StatsCard
            key={el.label}
            label={el.label}
            number={el.number}
            statHelper={el.statHelper}
            secondaryColor={el.secondaryColor}
            primaryColor={el.primaryColor}
            data={el.data}
          />
        ))}
      </Flex>
      <Flex gap={12} alignSelf={'stretch'} direction={{ base: 'column', md: 'row' }}>
        <ActivityGraph
          incomesColor={'green.500'}
          expensesColor={'red.500'}
        />
        <HomeHistoryTable />
      </Flex>
    </>
  );
}
