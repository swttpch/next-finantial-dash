import ActivityGraph from '@/components/ActivityGraph';
import FilterDrawer from '@/components/FilterDrawer';
import Filters from '@/components/Filters';
import PageTitle from '@/components/PageTitle';
import StatsCard from '@/components/StatsCard';
import HomeHistoryTable from '@/components/Tables/HomeHistory';
import { getAccounts } from '@/data/accounts';
import { getBalances, getBalancesByDay } from '@/data/balance';
import { getExpenses, getExpensesByDay } from '@/data/expenses';
import { getHistoryData } from '@/data/history';
import { getIncomes, getIncomesByDay } from '@/data/incomes';
import { getIndustries } from '@/data/industries';
import { getStates } from '@/data/states';
import { getDashboardCard } from '@/helpers/getDashboardCard';
import { Flex } from '@chakra-ui/react';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const period = ((await searchParams).period as string) || '7';
  const page = ((await searchParams).page as string) || '1';
  const pageSize = ((await searchParams).pagesize as string) || '10';
  const filterAccounts = (await searchParams).accounts as string[] | undefined;

  const filterIndustries = (await searchParams).industries as string[] | undefined;
  const filterStates = (await searchParams).states as string[] | undefined;
  const balancesByDay = isNaN(Number(period))
    ? await getBalancesByDay({
        period,
        accounts: filterAccounts,
        industries: filterIndustries,
        states: filterStates,
      })
    : await getBalances({
        period,
        accounts: filterAccounts,
        industries: filterIndustries,
        states: filterStates,
      });
  const expensesByDay = isNaN(Number(period))
    ? await getExpensesByDay({
        period,
        accounts: filterAccounts,
        industries: filterIndustries,
        states: filterStates,
      })
    : await getExpenses({
        period,
        accounts: filterAccounts,
        industries: filterIndustries,
        states: filterStates,
      });
  const incomesByDay = isNaN(Number(period))
    ? await getIncomesByDay({
        period,
        accounts: filterAccounts,
        industries: filterIndustries,
        states: filterStates,
      })
    : await getIncomes({
        period,
        accounts: filterAccounts,
        industries: filterIndustries,
        states: filterStates,
      });
  const history = await getHistoryData({
    page: Number(page),
    pageSize: Number(pageSize),
    query: {
      date: period,
      accounts: filterAccounts,
      industries: filterIndustries,
      states: filterStates,
    },
  });
  const states = await getStates();
  const accounts = await getAccounts();
  const industries = await getIndustries();
  return (
    <>
      <PageTitle title="Summary">
        <FilterDrawer states={states} accounts={accounts} industries={industries} />
      </PageTitle>
      <Filters states={states} />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignSelf={'stretch'}
        justify={'space-between'}
        gap={6}
      >
        {getDashboardCard({
          balance: balancesByDay[balancesByDay.length - 1]?.value || '0000',
          lastMonthBalance: balancesByDay[balancesByDay.length - 2]?.value || '0000',
          lastMonthExpense: balancesByDay[balancesByDay.length - 2]?.expenses || '0000',
          lastMonthIncome: balancesByDay[balancesByDay.length - 2]?.incomes || '0000',
          totalExpense: balancesByDay[balancesByDay.length - 1]?.expenses || '0000',
          totalIncome: balancesByDay[balancesByDay.length - 1]?.incomes || '0000',
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
      <ActivityGraph
        incomesColor={'green.500'}
        expensesColor={'red.500'}
        balanceColor={'blue.500'}
        oldBalanceColor="gray.500"
        data={balancesByDay}
      />
      <HomeHistoryTable data={history} states={states} />
    </>
  );
}
