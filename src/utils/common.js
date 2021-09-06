const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {isEscPressed, capitalizeFirstLetter};
