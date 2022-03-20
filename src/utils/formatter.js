const textFormatter = str => {
  const formattedStr = str
    .trim()
    .split(' ')
    .map(el => el.split('')[0].toUpperCase() + el.slice(1).toLowerCase())
    .join(' ');

  return formattedStr;
};

const priceFormatter = price => {
  const formatterPrice = price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  return formatterPrice;
};

export { textFormatter, priceFormatter };
