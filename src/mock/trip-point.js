import {getRandomInteger, getRandomElements} from './../utils/common.js';
import {generateOffers} from './../utils/trip-point.js';
import {destinationNames} from './destinations.js';
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

const getDestination = () => {
  const randomIndex = getRandomInteger(0, destinationNames.length - 1);

  return destinationNames[randomIndex];
};

const generateDate = (i) => ({
  dateFrom: dayjs().add(getRandomInteger(i*10, (i+1)*10), 'day').add(getRandomInteger(0, 24), 'hour').toDate(),
  dateTo: dayjs().add(getRandomInteger((i+1)*10, (i+2)*10), 'day').add(getRandomInteger(0, 24), 'hour').toDate(),
});


const generateTripPoint = (i) => {

  const {dateFrom, dateTo} = generateDate(i);
  const pointType = generateType();
  const availableOffers = generateOffers(pointType);

  return {
    type: pointType,
    destination: getDestination(),
    offers: getRandomElements(availableOffers, getRandomInteger(0, availableOffers.length)),
    id: i,
    dateFrom,
    dateTo,
    price: getRandomInteger(0, 2000),
    isFavourite: Boolean(getRandomInteger(0, 1)),
  };
};

const generateTripPoints = (amount) => new Array(amount).fill().map((_,i) => generateTripPoint(i));

export {generateTripPoints};
