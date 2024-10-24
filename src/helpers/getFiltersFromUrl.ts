export const getFiltersFromUrl = (url: string) => {
  const { searchParams } = new URL(url);

  const date = searchParams.get('period');
  const accounts = searchParams.getAll('accounts');
  const industries = searchParams.getAll('industries');
  const states = searchParams.getAll('states');

  const dateFilter = !date || date === '' ? '7' : date;
  const accountList = Array.isArray(accounts) ? accounts : [accounts];
  const industryList = Array.isArray(industries) ? industries : [industries];
  const stateList = Array.isArray(states) ? states : [states];
  return {
    date: dateFilter,
    accounts: accountList,
    industries: industryList,
    states: stateList,
  };
};
