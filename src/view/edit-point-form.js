import dayjs from 'dayjs';
import {generateOffers} from './../utils/trip-point.js';
import {capitalizeFirstLetter} from '../utils/common.js';
import Smart from './smart.js';
import {generateDestinations} from '../mock/destinations.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const destinations = generateDestinations();
const destinationNames = destinations.map((destinaton) => destinaton.name);
const getDestinationPhotos = (destination) => destination.pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`);

const createOffersList = (point) => {
  const offers = generateOffers(point.type);
  const pointOffers = point.offers.map((offer) => offer.name);

  return offers.map((offer, i) => `<div class="event__offer-selector">
      <input ${pointOffers.includes(offer.name) ? 'checked' : ''} class="event__offer-checkbox  visually-hidden" id="event-offer-${i}" type="checkbox" name="event-offer-luggage">
      <label class="event__offer-label" for="event-offer-${i}">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');
};


const createDestinationsOptions = () => destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');


const createEditPointFormTemplate = (point) => (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationsOptions()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(point.dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(point.dateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${destinationNames.includes(point.destination) ? '' : 'disabled'}>Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
          ${point.offers ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOffersList(point)}
      </div>
    </section>`: ''}

        ${destinationNames.includes(point.destination) ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinations[destinationNames.indexOf(point.destination)].description}.</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${getDestinationPhotos(destinations[destinationNames.indexOf(point.destination)])}
        </div>
      </div>
    </section>`
    : ''}

      </section>
    </form>
  </li>`);

export default class EditPointForm extends Smart {
  constructor(point) {
    super();
    this._point = point;
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._pointTypeSelectHandler = this._pointTypeSelectHandler.bind(this);
    this._pointDestinationInputHandler = this._pointDestinationInputHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this._setDatepicker();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _pointTypeSelectHandler(evt) {
    this.updateData({
      type: capitalizeFirstLetter(evt.target.parentElement.querySelector('input').value),
    });
  }

  _pointDestinationInputHandler(evt) {

    if (destinationNames.includes(evt.target.value) || evt.target.value === '') {
      this.updateData({
        destination: evt.target.value,
      });
    }
    const destinationInput = this.getElement().querySelector('.event__input--destination');

    const val = evt.target.value;
    destinationInput.value = '';
    destinationInput.focus();
    destinationInput.value = val;

    if (!destinationNames.includes(evt.target.value)) {
      this.getElement().querySelector('.event__save-btn').disabled = true;
    }
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._pointTypeSelectHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._pointDestinationInputHandler);
  }

  _setDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._startDatepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        defaultDate: this._point.dateFrom,
        minDate: 'today',
        ['time_24hr']: true,
        onChange: this._startDateChangeHandler,
      },
    );

    this._endDatepicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        defaultDate: this._point.dateTo,
        enableTime: true,
        ['time_24hr']: true,
        minDate: this._point.dateFrom,
        onChange: this._endDateChangeHandler,
      },
    );
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  getTemplate() {
    return createEditPointFormTemplate(this._point);
  }
}
