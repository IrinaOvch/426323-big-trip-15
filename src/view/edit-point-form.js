import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import Smart from './smart.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  dateFrom: 'today',
  dateTo: 'today',
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  isFavourite: false,
  offers: [],
  price: 0,
  type: 'flight',
  isBlank: true,
};

const createDestinationsOptions = (destinations) => destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

const getDestinationPhotos = (destination) => destination.pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`);

const createOffersList = (point, offers) => {
  const pointAvialiableOffers = offers.find((offer) => offer.name === point.type).offers;
  const pointOffers = point.offers.map((offer) => offer.title);

  return pointAvialiableOffers.map((offer, i) => `<div class="event__offer-selector">
      <input ${pointOffers.includes(offer.title) ? 'checked' : ''} class="event__offer-checkbox  visually-hidden" id="event-offer-${i}" type="checkbox" name="event-offer-luggage">
      <label class="event__offer-label" for="event-offer-${i}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');
};

const createEditPointFormTemplate = (point, offers, destinations, destinationNames) => (`<li class="trip-events__item">
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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationsOptions(destinations)}
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
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${point.price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${destinationNames.includes(point.destination.name) ? '' : 'disabled'}>Save</button>
        <button class="event__reset-btn" type="reset">${point.isBlank ? 'Cancel' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOffersList(point, offers, destinations)}
      </div>
    </section>

      ${destinationNames.includes(point.destination.name) ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinations[destinationNames.indexOf(point.destination.name)].description}.</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${getDestinationPhotos(destinations[destinationNames.indexOf(point.destination.name)])}
        </div>
      </div>
    </section>`
    : ''}

      </section>
    </form>
  </li>`
);

export default class EditPointForm extends Smart {
  constructor(appDataModel, point = BLANK_POINT) {
    super();
    this._point = point;
    this._offersData = appDataModel.getOffers();
    this._destinationsData = appDataModel.getDestinations();
    this._destinationNames = this._destinationsData.map((destinaton) => destinaton.name);
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._pointTypeSelectHandler = this._pointTypeSelectHandler.bind(this);
    this._pointDestinationInputHandler = this._pointDestinationInputHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
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
      type: evt.target.parentElement.querySelector('input').value,
      offers: [],
    });
  }

  _priceChangeHandler(evt) {
    this.updateData({
      price: Number(evt.target.value),
    }, true);
  }

  _offersChangeHandler(evt) {
    const pointOffersNames = this._point.offers.map((offer) => offer.title);
    if (evt.target.tagName === 'INPUT') {
      const clickedOfferName = evt.target.parentElement.querySelector('.event__offer-title').innerHTML;
      const clickedOfferPrice = Number(evt.target.parentElement.querySelector('.event__offer-price').innerHTML);
      if (pointOffersNames.includes(clickedOfferName)) {
        const offerIndex = pointOffersNames.findIndex((offer) => offer === clickedOfferName);
        this.updateData({
          offers: [
            ...this._point.offers.slice(0, offerIndex),
            ...this._point.offers.slice(offerIndex + 1),
          ],
        }, true);
      } else {
        this.updateData({
          offers: [
            ...this._point.offers,
            {
              title: clickedOfferName,
              price: clickedOfferPrice,
            },
          ],
        }, true);
      }
    }
  }

  _pointDestinationInputHandler(evt) {


    if (this._destinationNames.includes(evt.target.value) || evt.target.value === '') {
      const chosenDestination = this._destinationsData.find((destination) => destination.name === evt.target.value);
      this.updateData({
        destination: {
          name: evt.target.value,
          description: chosenDestination ? chosenDestination.description : '',
          pictures: chosenDestination ? chosenDestination.pictures : [],
        },
      });
    }
    const destinationInput = this.getElement().querySelector('.event__input--destination');

    const val = evt.target.value;
    destinationInput.value = '';
    destinationInput.focus();
    destinationInput.value = val;

    if (!this._destinationNames.includes(evt.target.value)) {
      this.getElement().querySelector('.event__save-btn').disabled = true;
    }
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._pointTypeSelectHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._pointDestinationInputHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change',  this._priceChangeHandler);
    if (this.getElement().querySelector('.event__available-offers')) {
      this.getElement().querySelector('.event__available-offers').addEventListener('click',  this._offersChangeHandler);
    }
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
        maxDate: this._point.dateTo,
        ['time_24hr']: true,
        onChange: this._startDateChangeHandler,
        dateFormat: 'y/m/d H:i',
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
        dateFormat: 'y/m/d H:i',
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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._point);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  getTemplate() {
    return createEditPointFormTemplate(this._point, this._offersData, this._destinationsData, this._destinationNames);
  }
}
