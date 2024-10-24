import { readJsonAndReturnRaw } from '@/helpers/readJsonAndReturnRaw';
export async function GET() {
  const rawData = await readJsonAndReturnRaw();

  const allIndustries = rawData.reduce((acc, cur) => {
    if (!acc.includes(cur.industry)) {
      acc.push(cur.industry);
    }
    return acc;
  }, [] as string[]);

  return new Response(JSON.stringify(allIndustries), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
