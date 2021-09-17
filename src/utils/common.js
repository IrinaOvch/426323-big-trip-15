import dayjs from 'dayjs';

const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const formatDuration = (difference) => {
  if (dayjs.duration(difference).asHours() < 1) {
    return dayjs.duration(difference).format('mm[M]');
  }

  if (dayjs.duration(difference).asDays() < 1) {
    return dayjs.duration(difference).format('HH[H] mm[M]');
  }

  if (dayjs.duration(difference).asDays() >= 1) {
    return dayjs.duration(difference).format('DD[D] HH[H] mm[M]');
  }
};

const capitalizeFirstLetter = (string) =>  string.charAt(0).toUpperCase() + string.slice(1);

export {isEscPressed, formatDuration, capitalizeFirstLetter};
