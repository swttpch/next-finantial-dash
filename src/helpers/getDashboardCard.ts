import { StatsCardProps } from '@/types/common.types';

interface getDashboardCardProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  lastMonthIncome: number;
  lastMonthExpense: number;
  lastMonthBalance: number;
}

export const getDashboardCard = ({
  balance,
  lastMonthBalance,
  lastMonthExpense,
  lastMonthIncome,
  totalExpense,
  totalIncome,
}: getDashboardCardProps): Array<StatsCardProps> => {
  const balanceDifference = balance / lastMonthBalance;
  const incomesDifference = totalIncome / lastMonthIncome;
  const expensesDifference = totalExpense / lastMonthExpense;
  const balanceCard: StatsCardProps = {
    label: 'Balance',
    number: balance.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    ...(balanceDifference !== 1 && {
      statHelper: {
        type: balanceDifference > 1 ? 'increase' : 'decrease',
        value: (balanceDifference > 1
          ? balanceDifference - 1
          : 1 - balanceDifference
        ).toLocaleString('pt-br', {
          style: 'percent',
          minimumFractionDigits: 2,
        }),
      },
    }),
    primaryColor: 'blue.500',
    secondaryColor: 'blue.50',
  };

  const incomesCard: StatsCardProps = {
    label: 'Total Incomes',
    number: totalIncome.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    ...(incomesDifference !== 1 && {
      statHelper: {
        type: incomesDifference > 1 ? 'increase' : 'decrease',
        value: (incomesDifference > 1
          ? incomesDifference - 1
          : 1 - incomesDifference
        ).toLocaleString('pt-br', {
          style: 'percent',
          minimumFractionDigits: 2,
        }),
      },
    }),
    primaryColor: 'green.500',
    secondaryColor: 'green.50',
  };

  const expensesCard: StatsCardProps = {
    label: 'Total Expenses',
    number: totalExpense.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    ...(expensesDifference !== 1 && {
      statHelper: {
        type: expensesDifference > 1 ? 'increase' : 'decrease',
        value: (expensesDifference > 1
          ? expensesDifference - 1
          : 1 - expensesDifference
        ).toLocaleString('pt-br', {
          style: 'percent',
          minimumFractionDigits: 1,
        }),
      },
    }),
    primaryColor: 'red.500',
    secondaryColor: 'red.50',
  };

  return [balanceCard, incomesCard, expensesCard];
};
