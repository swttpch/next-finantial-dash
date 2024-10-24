import { CURRENT_TIME } from '@/constants/common';
import { TransactionType } from '@/types/transaction.types';

export const filterRawData = (
  rawData: Array<TransactionType>,
  {
    date: dateFilter,
    industries: industryList = [],
    accounts: accountList = [],
    states: stateList = [],
  }: {
    date?: string;
    industries?: Array<string>;
    accounts?: Array<string>;
    states?: Array<string>;
  },
) => {
  const filteredData: Array<TransactionType> = [];
  rawData.forEach((transaction) => {
    if (accountList) {
      if (accountList.length > 0 && !accountList.includes(transaction.account)) return;
    }
    if (industryList) {
      if (industryList.length > 0 && !industryList.includes(transaction.industry)) return;
    }
    if (stateList) {
      if (stateList.length > 0 && !stateList.includes(transaction.state)) return;
    }
    if (dateFilter) {
      if (isNaN(Number(dateFilter))) {
        if (new Date(transaction.date).toISOString().split('T')[0] !== dateFilter) {
          return;
        }
      } else {
        const date = new Date(transaction.date);
        const today = new Date(CURRENT_TIME);
        const diffTime = Math.abs(today.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > Number(dateFilter)) {
          return;
        }
      }
    }
    filteredData.push(transaction);
  });

  return filteredData;
};
