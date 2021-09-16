import dayjs from 'dayjs';

const makeItemsUniq = (items) => [...new Set(items)];

const countPricesByTypes = (points, type) => points.filter((point) => point.type === type).reduce(((acc, currentVal) => acc + currentVal.price), 0);

const countPointsByTypes = (points, type) => points.filter((point) => point.type === type).length;

const countPointsByTime = (points, type) => points.filter((point) => point.type === type).reduce(((acc, currentVal) =>
{

  const difference = dayjs(currentVal.dateTo).diff(dayjs(currentVal.dateFrom), 'milliseconds');
  return acc + difference;
}
), 0);

export {makeItemsUniq, countPricesByTypes, countPointsByTypes, countPointsByTime};

