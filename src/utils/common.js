const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElements = (array, amount) => array.slice().sort(() => 0.5 - Math.random()).slice(0, amount);

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {isEscPressed, getRandomInteger, getRandomElements, updateItem};