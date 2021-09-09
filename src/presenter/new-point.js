import PointEditView from '../view/edit-point-form.js';
import {RenderPosition, remove, render} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';
import {isEscPressed} from '../utils/common.js';
import {nanoid} from 'nanoid';

export default class NewPoint {
  constructor(pointsListContainer, changeData, appDataModel) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._appDataModel = appDataModel;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView(this._appDataModel);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointEditComponent.setEditClickHandler(this._handleDeleteClick);

    render(this._pointsListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, point),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
