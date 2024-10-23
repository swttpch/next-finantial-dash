import ActivityGraph from '@/components/ActivityGraph';
import PageTitle from '@/components/PageTitle';
import SelectPeriod from '@/components/SelectPeriod';
import StatsCard from '@/components/StatsCard';
import HomeHistoryTable from '@/components/Tables/HomeHistory';
import { getBalances } from '@/data/balance';
import { getExpenses } from '@/data/expenses';
import { getHistoryData } from '@/data/history';
import { getIncomes } from '@/data/incomes';
import { getDashboardCard } from '@/helpers/getDashboardCard';
import { Button, Flex } from '@chakra-ui/react';
import { IoFilterCircleOutline } from 'react-icons/io5';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const period = ((await searchParams).period as string) || '7';
  const page = ((await searchParams).page as string) || '1';
  const pageSize = ((await searchParams).pagesize as string) || '10';
  const balancesByDay = await getBalances(period);
  const expensesByDay = await getExpenses(period);
  const incomesByDay = await getIncomes(period);
  const history = await getHistoryData({ page: Number(page), pageSize: Number(pageSize) });
  return (
    <>
      <PageTitle title="Summary">
        <Button variant={'outline'} leftIcon={<IoFilterCircleOutline />}>
          Filter
        </Button>
      </PageTitle>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignSelf={'stretch'}
        justify={'space-between'}
        gap={6}
      >
        {getDashboardCard({
          balance: balancesByDay[balancesByDay.length - 1].value,
          lastMonthBalance: balancesByDay[balancesByDay.length - 2].value,
          lastMonthExpense: balancesByDay[balancesByDay.length - 2].expenses,
          lastMonthIncome: balancesByDay[balancesByDay.length - 2].incomes,
          totalExpense: balancesByDay[balancesByDay.length - 1].expenses,
          totalIncome: balancesByDay[balancesByDay.length - 1].incomes,
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
        <ActivityGraph
          incomesColor={'green.500'}
          expensesColor={'red.500'}
          balanceColor={'blue.500'}
          oldBalanceColor="gray.500"
          data={balancesByDay}
        />
      </Flex>
      <HomeHistoryTable data={history} />
    </>
  );
}
