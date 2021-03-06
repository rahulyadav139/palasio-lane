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

const dateFormatter = date => {
  const formattedDate = new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return formattedDate;
};

export { textFormatter, priceFormatter, dateFormatter };
