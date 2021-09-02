import {FilterType} from '../const';
import {isFuture} from '../utils/trip-point.js';

const filter = {
  [FilterType.ALL]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => !isFuture(point.dateTo)),
};

export {filter};
