import {getRandomElements, getRandomInteger} from '../utils/common.js';

const destinationNames = [
  'Stockholm',
  'Karlstad',
  'Göteborg',
  'Åmål',
  'Lidingö',
  'Dalarna',
  'Malmö',
  'Lund',
];

const generateDescription = () => {
  const minAmount = 1;
  const maxAmount = 5;
  const descriptionTemplate = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const descriptions = descriptionTemplate.split('. ');

  return getRandomElements(descriptions, getRandomInteger(minAmount, maxAmount)).join('. ');
};

const generatePhotos = () => new Array(getRandomInteger(1, 10)).fill().map(() => ({
  src: `http://picsum.photos/248/152?r=${Math.random()}`,
  description: generateDescription(),
}));

const generateDestination = (i) => ({
  description: generateDescription(),
  name: destinationNames[i],
  pictures: generatePhotos(),
});

const generateDestinations = () => destinationNames.map((_, i) => generateDestination(i));

export {destinationNames, generateDestinations};
