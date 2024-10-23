import ActivityGraph from '@/components/ActivityGraph';
import PageTitle from '@/components/PageTitle';
import SelectPeriod from '@/components/SelectPeriod';
import StatsCard from '@/components/StatsCard';
import HomeHistoryTable from '@/components/Tables/HomeHistory';
import { getBalanceByDay, getBalanceData } from '@/data/balance';
import { getExpensesByDay, getExpensesData } from '@/data/expenses';
import { getHistoryData } from '@/data/history';
import { getIncomesByDay, getIncomesData } from '@/data/incomes';
import { getDashboardCard } from '@/helpers/getDashboardCard';
import { Flex, Select } from '@chakra-ui/react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const period = ((await searchParams).period as string) || '7';
  const page = ((await searchParams).page as string) || '1';
  const pageSize = ((await searchParams).pagesize as string) || '10';
  const balances = await getBalanceData();
  const balancesByDay = await getBalanceByDay(period);
  const expenses = await getExpensesData();
  const expensesByDay = await getExpensesByDay(period);
  const incomes = await getIncomesData();
  const incomesByDay = await getIncomesByDay(period);
  const history = await getHistoryData({ page: Number(page), pageSize: Number(pageSize) });
  return (
    <>
      <PageTitle title="Summary">
        <SelectPeriod />
      </PageTitle>
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
          balances: balancesByDay,
          incomes: incomesByDay,
          expenses: expensesByDay,
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
        <ActivityGraph incomesColor={'green.500'} expensesColor={'red.500'} />
      </Flex>
      <HomeHistoryTable data={history} />
    </>
  );
}
