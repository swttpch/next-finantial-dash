import { readJsonAndReturnRaw } from '@/helpers/readJsonAndReturnRaw';
export async function GET() {
  const rawData = await readJsonAndReturnRaw();

  const allAccounts = rawData.reduce((acc, cur) => {
    if (!acc.includes(cur.account)) {
      acc.push(cur.account);
    }
    return acc;
  }, [] as string[]);

  return new Response(JSON.stringify(allAccounts), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
