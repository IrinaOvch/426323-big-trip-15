import {remove, render, RenderPosition} from '../utils/render.js';
import PointsListView from '../view/points-list.js';
import EmptyPointsListView from '../view/empty-points-list-message.js';
import SiteSortingView from '../view/site-sorting.js';
import TripPointPresenter, {State as PointPresenterViewState} from './trip-point.js';
import NewPointPresenter from './new-point.js';
import ErrorMessageView from '../view/error-message.js';
import LoadingView from '../view/loading.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortPointsByDate, sortPointsByDuration, sortPointsByPrice} from '../utils/trip-point.js';
import {filter} from '../utils/filter.js';

export default class Trip {
  constructor(mainContentContainer, pointsModel, filterModel, appDataModel, api) {
    this._pointsModel = pointsModel;
    this._mainContentContainer = mainContentContainer;
    this._filterModel = filterModel;
    this._appDataModel = appDataModel;
    this._api = api;


    this._tripPointPresenter = new Map();
    this._filterType = FilterType.ALL;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._noPointsComponent = null;
    this._errorMessageComponent = null;

    this._sortComponent = null;

    this._pointsListComponent = new PointsListView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newPointPresenter = new NewPointPresenter(this._pointsListComponent, this._handleViewAction, this._appDataModel);
  }

  init() {
    this._renderTrip();

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._pointsListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this._newPointPresenter.init();
  }

  renderErrorMessage(err) {
    this._errorMessageComponent = new ErrorMessageView(err);
    render(this._mainContentContainer, this._errorMessageComponent , RenderPosition.AFTERBEGIN);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[this._filterType](points);

    switch(this._currentSortType) {
      case SortType.TIME:
        return filtredPoints.sort(sortPointsByDuration);
      case SortType.PRICE:
        return filtredPoints.sort(sortPointsByPrice);
      default:
        return filtredPoints.sort(sortPointsByDate);
    }
  }

  _handleModeChange() {
    this._tripPointPresenter.forEach((presenter) => presenter.resetView());
    this._newPointPresenter.destroy();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SiteSortingView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._mainContentContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const tripPointPresenter = new TripPointPresenter(this._pointsListComponent, this._handleViewAction, this._handleModeChange, this._appDataModel);
    tripPointPresenter.init(point);
    this._tripPointPresenter.set(point.id, tripPointPresenter);
  }

  _renderPoints(points) {
    points.forEach((_, i) => this._renderPoint(points[i]));
  }

  _renderNoPoints() {
    this._noPointsComponent = new EmptyPointsListView(this._filterType);
    render(this._mainContentContainer, this._noPointsComponent , RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._mainContentContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearPointsList() {
    this._tripPointPresenter.forEach((presenter) => presenter.destroy());
    this._tripPointPresenter.clear();
  }

  _clearTrip({resetSortType = false} = {}) {
    this._newPointPresenter.destroy();
    this._tripPointPresenter.forEach((presenter) => presenter.destroy());
    this._tripPointPresenter.clear();

    remove(this._sortComponent);
    remove(this._loadingComponent);

    if (this._noPointsComponent) {
      remove(this._noPointsComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this._tripPointPresenter.get(update.id).setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._tripPointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._newPointPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this.NewPointPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._tripPointPresenter.get(update.id).setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._tripPointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._tripPointPresenter.get(data.id).init(data);

        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip({resetSortType: false});
    this._renderTrip();
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();

    if (points.length > 0) {
      this._renderSort();
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
      render(this._mainContentContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
      this._renderPoints(points);
    } else {
      render(this._mainContentContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
      this._renderNoPoints();
    }
  }
}
