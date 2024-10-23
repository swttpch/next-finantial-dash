export const getCurrency = (value: string): string => {
  const valueNum = Number(value);
  if (isNaN(valueNum)) {
    throw new Error('Invalid value');
  }
  return (Number(value) * 0.01).toLocaleString('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: 'BRL',
  });
};

export const getCurrencyValue = (value: string): number => {
  console.log(value);
  const valueNum = Number(value);
  if (isNaN(valueNum)) {
    throw new Error('Invalid value');
  }
  return valueNum * 0.01;
};
