const { NEXT_URL } = process.env;

if (!NEXT_URL) {
  throw new Error('NEXT_URL is missing');
}
export const envVariables = {
  NEXT_URL,
};
