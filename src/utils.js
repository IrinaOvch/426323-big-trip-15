const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElements = (array, amount) => array.slice().sort(() => 0.5 - Math.random()).slice(0, amount);

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

export {getRandomInteger, getRandomElements, generateOffers};
