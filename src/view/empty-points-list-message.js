import AbstractView from './abstract.js';

const createEmptyPointsListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyPointsList extends AbstractView {
  getTemplate() {
    return createEmptyPointsListTemplate();
  }
}
