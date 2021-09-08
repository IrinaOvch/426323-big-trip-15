import AbstractView from './abstract.js';

const createErrorMessageTemplate = (err) => {
  const errorMessage = `<p class="trip-events__error">${err}. Please reload the page</p>`;


  return errorMessage;
};

export default class EmptyPointsList extends AbstractView {
  constructor(err) {
    super();
    this._err = err;
  }

  getTemplate() {
    return createErrorMessageTemplate(this._err);
  }
}
