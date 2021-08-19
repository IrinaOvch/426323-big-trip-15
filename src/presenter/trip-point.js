import TripPointView from '../view/trip-point.js';
import EditPointFormView from '../view/edit-point-form.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {isEscPressed} from '../utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPoint {
  constructor(pointsListContainer, changeData, changeMode) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripPointComponent = null;
    this._EditTripPointComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleMinimizeClick = this._handleMinimizeClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevTripPointComponent = this._tripPointComponent;
    const prevEditTripPointComponent = this._EditTripPointComponent;

    this._tripPointComponent = new TripPointView(this._point);
    this._EditTripPointComponent = new EditPointFormView(this._point);

    this._tripPointComponent.setEditClickHandler(this._handleEditClick);
    this._tripPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._EditTripPointComponent.setEditClickHandler(this._handleMinimizeClick);
    this._EditTripPointComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevTripPointComponent === null || prevEditTripPointComponent === null) {
      render(this._pointsListContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._EditTripPointComponent, prevEditTripPointComponent);
    }

    remove(prevEditTripPointComponent);
    remove(prevTripPointComponent);
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._EditTripPointComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._EditTripPointComponent, this._tripPointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripPointComponent, this._EditTripPointComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleMinimizeClick() {
    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavourite: !this._point.isFavourite,
        },
      ),
    );
  }

  _handleFormSubmit() {
    this._changeData(this._point);
    this._replaceFormToCard();
  }
}
