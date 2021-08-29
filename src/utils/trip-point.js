import dayjs from 'dayjs';

const generateOffers = (type) => {
  const offers =  {
    'Taxi': [
      {
        name: 'Choose the radio station',
        price: 10,
      },
      {
        name: 'Drive quickly, Im in a hurry',
        price: 50,
      },
      {
        name: 'Turn on AC',
        price: 20,
      },
    ],
    'Bus': [
      {
        name: 'Sit next to the driver',
        price: 5,
      },
      {
        name: 'Turn on AC',
        price: 10,
      },
      {
        name: 'Choose seat',
        price: 10,
      },
    ],
    'Train': [
      {
        name: 'Choose seat',
        price: 20,
      },
      {
        name: 'Book a taxi at the arrival point',
        price: 110,
      },
      {
        name: 'Order a breakfast',
        price: 80,
      },
    ],
    'Ship': [
      {
        name: 'Choose seat',
        price: 20,
      },
      {
        name: 'Choose meal',
        price: 35,
      },
    ],
    'Drive': [
      {
        name: 'Choose comfort class',
        price: 110,
      },
      {
        name: 'Choose business class',
        price: 180,
      },
    ],
    'Flight': [
      {
        name: 'Choose business class',
        price: 150,
      },
      {
        name: 'Choose seat',
        price: 25,
      },
      {
        name: 'Choose meal',
        price: 15,
      },
    ],
    'Check-in': [
      {
        name: 'Choose the time of check-in',
        price: 70,
      },
      {
        name: 'Skip the queue',
        price: 150,
      },
    ],
    'Sightseeing': [
      {
        name: 'Get a personal guide',
        price: 1000,
      },
      {
        name: 'Skip the queue',
        price: 150,
      },
    ],
    'Restaurant': [
      {
        name: 'Book a table',
        price: 10,
      },
      {
        name: 'Choose live music',
        price: 150,
      },
      {
        name: 'Choose VIP area',
        price: 70,
      },
    ],
  };

  return offers[type];
};

const sortPointsByDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsByDuration = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo));
  const pointBDuration = dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
  return pointADuration - pointBDuration;
};

const sortPointsByPrice = (pointA, pointB) => pointB.price - pointA.price;

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');

const isFuture = (date) => date === null ? false : dayjs(date).isAfter(dayjs(), 'D');

export {generateOffers, sortPointsByDate, sortPointsByDuration, sortPointsByPrice, isDatesEqual, isFuture};
