import dayjs from 'dayjs';

const POINT_TYPES = [
  'taxi', 'bus','train','ship','transport','drive', 'flight', 'check-in', 'sightseeing', 'restaurant',
];

const sortPointsByDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsByDuration = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo));
  const pointBDuration = dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
  return pointADuration - pointBDuration;
};

const sortPointsByPrice = (pointA, pointB) => pointB.price - pointA.price;

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');

const isFuture = (date) => date === null ? false : dayjs(date).isAfter(dayjs(), 'D');

export {sortPointsByDate, sortPointsByDuration, sortPointsByPrice, isDatesEqual, isFuture, POINT_TYPES};
