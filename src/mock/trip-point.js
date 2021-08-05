import {getRandomInteger, getRandomElements} from './../utils.js';
import dayjs from 'dayjs';

const generateType = () => {
  const types = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant',
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateDestination = () => {
  const destinations = [
    'Stockholm',
    'Karlstad',
    'Göteborg',
    'Åmål',
    'Lidingö',
    'Dalarna',
    'Malmö',
    'Lund',
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const generateDate = () => ({
  dateFrom: dayjs().add(getRandomInteger(0, 30), 'day').add(getRandomInteger(0, 24), 'hour').toDate(),
  dateTo: dayjs().add(getRandomInteger(30, 60), 'day').add(getRandomInteger(0, 24), 'hour').toDate(),
});


const generateDescription = () => {
  const minAmount = 1;
  const maxAmount = 5;
  const descriptionTemplate = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const descriptions = descriptionTemplate.split('. ');

  return getRandomElements(descriptions, getRandomInteger(minAmount, maxAmount)).join('. ');
};

const generatePhotos = () => new Array(getRandomInteger(1, 10)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);

const generateOptions = (type) => {
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

const generateTripPoint = () => {

  const {dateFrom, dateTo} = generateDate();
  const pointType = generateType();

  return {
    type: pointType,
    destination: generateDestination(),
    offers: generateOptions(pointType),
    dateFrom,
    dateTo,
    price: getRandomInteger(0, 2000),
    isFavourite: Boolean(getRandomInteger(0, 1)),
    destinationInfo: {
      description: generateDescription(),
      photos: generatePhotos(),
    },
  };
};

const generateTripPoints = (amount) => new Array(amount).fill().map(() => generateTripPoint());

export {generateTripPoints};
