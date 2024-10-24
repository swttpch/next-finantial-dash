import { readJsonAndReturnRaw } from '@/helpers/readJsonAndReturnRaw';
import { TransactionType } from '@/types/transaction.types';
import { promises as fs } from 'fs';

// TODO: add cache control
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const days = searchParams.get('days');
  const rawData = await readJsonAndReturnRaw();

  const transactionsByDay = rawData
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
  const responseData = Object.keys(transactionsByDay).reduce((acc, cur, index) => {
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

  const slicedData = responseData.slice(
    responseData.length - (Number(days) || 0),
    responseData.length,
  );

  return new Response(JSON.stringify(slicedData), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
