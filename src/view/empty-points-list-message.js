import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const NoPointsTextType = {
  [FilterType.ALL]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createEmptyPointsListTemplate = (filterType) => {
  const noPoinysTextValue = NoPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">${noPoinysTextValue}</p>`
  );
};

export default class EmptyPointsList extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createEmptyPointsListTemplate(this._data);
  }
}
