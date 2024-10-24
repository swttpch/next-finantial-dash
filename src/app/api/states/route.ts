import { readJsonAndReturnRaw } from '@/helpers/readJsonAndReturnRaw';
export async function GET() {
  const rawData = await readJsonAndReturnRaw();

  const allStates = rawData.reduce((acc, cur) => {
    if (!acc.includes(cur.state)) {
      acc.push(cur.state);
    }
    return acc;
  }, [] as string[]);

  return new Response(JSON.stringify(allStates), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
