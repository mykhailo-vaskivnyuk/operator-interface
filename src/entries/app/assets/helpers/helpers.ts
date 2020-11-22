const numberFormatterCurrency = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'UAH',
  currencyDisplay: 'symbol',
});
export const numberToCurrency = numberFormatterCurrency.format.bind(numberFormatterCurrency);

const numberFormatter2 = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export const numberToFix2 = numberFormatter2.format.bind(numberFormatter2);

const numberFormatter3 = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});
export const numberToFix3 = numberFormatter3.format.bind(numberFormatter3);
