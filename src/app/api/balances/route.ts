import { CURRENT_TIME } from '@/constants/common';
import { getCurrencyValue } from '@/helpers/getCurrencyValue';
import { TransactionType } from '@/types/transaction.types';
import { promises as fs } from 'fs';
// TODO: add cache control
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') as null | 'today' | 'last_3_days' | 'last_week';
  const file = await fs.readFile(process.cwd() + '/transactions.json', 'utf8');
  const currentMonth = new Date(CURRENT_TIME).getMonth();
  const currentYear = new Date(CURRENT_TIME).getFullYear();

  const data = (JSON.parse(file) as Array<TransactionType>).filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    if (period === 'today') {
      return (
        transactionDate.getDate() === new Date(CURRENT_TIME).getDate() &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    }
    if (period === 'last_3_days') {
      const threeDaysAgo = new Date(CURRENT_TIME);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      return transactionDate >= threeDaysAgo && transactionDate <= new Date(CURRENT_TIME);
    }
    if (period === 'last_week') {
      const oneWeekAgo = new Date(CURRENT_TIME);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return transactionDate >= oneWeekAgo && transactionDate <= new Date(CURRENT_TIME);
    }
    return true;
  });

  const beforeData = (JSON.parse(file) as Array<TransactionType>).filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    if (period === 'today') {
      const yesterday = new Date(CURRENT_TIME);
      yesterday.setDate(yesterday.getDate() - 1);
      return (
        transactionDate.getDate() === yesterday.getDate() &&
        transactionDate.getMonth() === yesterday.getMonth() &&
        transactionDate.getFullYear() === yesterday.getFullYear()
      );
    }
    if (period === 'last_3_days') {
      const threeDaysAgo = new Date(CURRENT_TIME);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const sixDaysAgo = new Date(CURRENT_TIME);
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
      return transactionDate >= sixDaysAgo && transactionDate < threeDaysAgo;
    }
    if (period === 'last_week') {
      const oneWeekAgo = new Date(CURRENT_TIME);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const twoWeeksAgo = new Date(CURRENT_TIME);
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      return transactionDate >= twoWeeksAgo && transactionDate < oneWeekAgo;
    }
    return true;
  });

  return new Response(
    JSON.stringify({
      total: data.reduce((acc, cur) => (acc += getCurrencyValue(cur.amount)), 0).toString(),
      lastMonth: beforeData
        .reduce((acc, cur) => (acc += getCurrencyValue(cur.amount)), 0)
        .toString(),
      data: data.sort((a, b) => {
        return b.date - a.date;
      }),
      beforeData: beforeData.sort((a, b) => {
        return b.date - a.date;
      }),
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
      statusText: 'OK',
    },
  );
}
