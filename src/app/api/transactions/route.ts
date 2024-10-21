import { promises as fs } from 'fs';
// TODO: add cache control
export async function GET(request: Request) {
  const file = await fs.readFile(process.cwd() + '/transactions.json', 'utf8');

  return new Response(file, {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
