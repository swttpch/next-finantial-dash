import { StatsCardProps } from '@/types/common.types';
import { getCurrency, getCurrencyValue } from './getCurrencyValue';
import { PERIODS } from '@/constants/periods';

interface getDashboardCardProps {
  balance: string;
  totalIncome: string;
  totalExpense: string;
  lastMonthIncome: string;
  lastMonthExpense: string;
  lastMonthBalance: string;
  balances: Array<{ value: string; date: string }>;
  incomes: Array<{ value: string; date: string }>;
  expenses: Array<{ value: string; date: string }>;
}

export const getDashboardCard = ({
  balance,
  lastMonthBalance,
  lastMonthExpense,
  lastMonthIncome,
  totalExpense,
  totalIncome,
  balances,
  incomes,
  expenses,
}: getDashboardCardProps): Array<StatsCardProps> => {
  const balanceDifference = getCurrencyValue(balance) / getCurrencyValue(lastMonthBalance);
  const incomesDifference = getCurrencyValue(totalIncome) / getCurrencyValue(lastMonthIncome);
  const expensesDifference = getCurrencyValue(totalExpense) / getCurrencyValue(lastMonthExpense);
  const balanceCard: StatsCardProps = {
    label: 'Balance',
    number: getCurrency(balance),
    ...(!isNaN(balanceDifference) &&
      balanceDifference !== 1 && {
        statHelper: {
          from: PERIODS.today.statsLabel,
          type: balanceDifference > 1 ? 'increase' : 'decrease',
          value: (balanceDifference > 1
            ? balanceDifference - 1
            : 1 - balanceDifference
          ).toLocaleString('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
          }),
        },
      }),
    primaryColor: 'blue.500',
    secondaryColor: 'blue.50',
    data: balances,
  };

  const incomesCard: StatsCardProps = {
    label: 'Today incomes',
    number: getCurrencyValue(totalIncome).toLocaleString('en-US', {
      style: 'currency',
      currency: 'BRL',
    }),
    ...(!isNaN(incomesDifference) &&
      incomesDifference !== 1 && {
        statHelper: {
          from: PERIODS.today.statsLabel,
          type: incomesDifference > 1 ? 'increase' : 'decrease',
          value: (incomesDifference > 1
            ? incomesDifference - 1
            : 1 - incomesDifference
          ).toLocaleString('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
          }),
        },
      }),
    primaryColor: 'green.500',
    secondaryColor: 'green.50',
    data: incomes,
  };

  const expensesCard: StatsCardProps = {
    label: 'Today expenses',
    number: (getCurrencyValue(totalExpense) * -1).toLocaleString('en-US', {
      style: 'currency',
      currency: 'BRL',
    }),
    ...(!isNaN(expensesDifference) &&
      expensesDifference !== 1 && {
        statHelper: {
          from: PERIODS.today.statsLabel,
          isReverse: true,
          type: expensesDifference < 1 ? 'increase' : 'decrease',
          value: (expensesDifference > 1
            ? expensesDifference - 1
            : 1 - expensesDifference
          ).toLocaleString('en-US', {
            style: 'percent',
            minimumFractionDigits: 1,
          }),
        },
      }),
    primaryColor: 'red.500',
    secondaryColor: 'red.50',
    data: expenses,
  };

  return [balanceCard, incomesCard, expensesCard];
};
