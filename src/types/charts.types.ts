export interface ActivityGraphLineChartProps {
  incomesColor: string;
  expensesColor: string;
  balanceColor: string;
  oldBalanceColor: string;
  data: { value: string; date: string; incomes: string; expenses: string; old_balance: string }[];
}
