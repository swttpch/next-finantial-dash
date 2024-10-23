'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export const usePagination = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get('page') ?? 1);
  const pagesize = Number(searchParams.get('pagesize') ?? 10);

  const setPageIndex = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };
  const setPageSize = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('pagesize', newPageSize.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { page, pagesize, setPageIndex, setPageSize };
};
