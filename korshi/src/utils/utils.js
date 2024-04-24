export const formatCurrency = (value) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return 'Invalid input';
  }

  const formattedValue = numericValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return formattedValue.split('.')[0] + ' ₸';
};
