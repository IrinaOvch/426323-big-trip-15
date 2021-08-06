import {getRandomInteger, getRandomElements, generateOffers} from './../utils.js';
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

const generateDate = (i) => ({
  dateFrom: dayjs().add(getRandomInteger(i*10, (i+1)*10), 'day').add(getRandomInteger(0, 24), 'hour').toDate(),
  dateTo: dayjs().add(getRandomInteger((i+1)*10, (i+2)*10), 'day').add(getRandomInteger(0, 24), 'hour').toDate(),
});


const generateDescription = () => {
  const minAmount = 1;
  const maxAmount = 5;
  const descriptionTemplate = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const descriptions = descriptionTemplate.split('. ');

  return getRandomElements(descriptions, getRandomInteger(minAmount, maxAmount)).join('. ');
};

const generatePhotos = () => new Array(getRandomInteger(1, 10)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);

const generateTripPoint = (i) => {

  const {dateFrom, dateTo} = generateDate(i);
  const pointType = generateType();
  const availableOffers = generateOffers(pointType);

  return {
    type: pointType,
    destination: generateDestination(),
    offers: getRandomElements(availableOffers, getRandomInteger(0, availableOffers.length)),
    id: i,
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

const generateTripPoints = (amount) => new Array(amount).fill().map((_,i) => generateTripPoint(i));

export {generateTripPoints};
