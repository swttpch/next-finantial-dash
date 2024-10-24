export const getSearchParamsFromFilter = (query?: {
  date?: string;
  accounts?: string[];
  industries?: string[];
  states?: string[];
}) => {
  const searchParams = new URLSearchParams();
  if (query?.date) {
    searchParams.set('period', query.date);
  }
  if (query?.accounts) {
    const acc = typeof query.accounts === 'string' ? [query.accounts] : query.accounts;
    acc.forEach((account) => searchParams.append('accounts', account));
  }
  if (query?.industries) {
    const ind = typeof query.industries === 'string' ? [query.industries] : query.industries;
    ind.forEach((industry) => searchParams.append('industries', industry));
  }
  if (query?.states) {
    const stat = typeof query.states === 'string' ? [query.states] : query.states;
    stat.forEach((state) => searchParams.append('states', state));
  }
  return searchParams;
};
