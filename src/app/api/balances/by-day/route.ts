import { filterRawData } from '@/helpers/filterRawData';
import { readJsonAndReturnRaw } from '@/helpers/readJsonAndReturnRaw';
import { TransactionType } from '@/types/transaction.types';

// TODO: add cache control
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const rawData = await readJsonAndReturnRaw();
  const filteredData = filterRawData(rawData, {
    accounts: searchParams.getAll('accounts'),
    industries: searchParams.getAll('industries'),
    states: searchParams.getAll('states'),
    date: searchParams.get('period') ?? undefined,
  });
  const transactionsByDay = filteredData
    .sort((a, b) => a.date - b.date)
    .reduce((acc, transaction) => {
      const date = new Date(transaction.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {} as Record<string, TransactionType[]>);

  let runningBalance = 0; // Initialize a running balance to track old balance across iterations
  const responseData = Object.keys(transactionsByDay).reduce((acc, cur) => {
    const total = transactionsByDay[cur].reduce(
      (innerAcc, current) => {
        const amount = Number(current.amount);
        if (current.transaction_type === 'deposit') {
          innerAcc.incomes += amount;
          innerAcc.balance += amount;
        }
        if (current.transaction_type === 'withdraw') {
          innerAcc.expenses += amount;
          innerAcc.balance -= amount;
        }
        return innerAcc;
      },
      {
        balance: 0,
        incomes: 0,
        expenses: 0,
      },
    );

    const oldBalance = runningBalance; // Use the running balance as old balance
    const newBalance = oldBalance + total.balance;
    acc.push({
      value: newBalance.toString(),
      date: cur,
      incomes: total.incomes.toString(),
      expenses: total.expenses.toString(),
      old_balance: oldBalance.toString(),
    });

    runningBalance = newBalance; // Update running balance for the next iteration

    return acc;
  }, [] as Array<{ value: string; date: string; incomes: string; expenses: string; old_balance: string }>);

  return new Response(JSON.stringify(responseData), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
