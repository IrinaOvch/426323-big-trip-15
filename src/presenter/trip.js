import {render, RenderPosition} from '../utils/render.js';
import PointsListView from '../view/points-list.js';
import EmptyPointsListView from '../view/empty-points-list-message.js';
import SiteSortingView from '../view/site-sorting.js';
import TripPointPresenter from './trip-point.js';
import {updateItem} from '../utils/common.js';

export default class Trip {
  constructor(mainContentContainer) {
    this._mainContentContainer = mainContentContainer;
    this._tripPointPresenter = new Map();

    this._pointsListComponent = new PointsListView();
    this._noPointsComponent = new EmptyPointsListView();
    this._sortComponent = new SiteSortingView();

    this._handleTripPointChange = this._handleTripPointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._tripPoints = points.slice();

    this._renderTrip();
  }

  _handleModeChange() {
    this._tripPointPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._mainContentContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPointsList() {
    render(this._mainContentContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
    this._renderPoints(this._tripPoints);
  }

  _renderPoint(point) {
    const tripPointPresenter = new TripPointPresenter(this._pointsListComponent, this._handleTripPointChange, this._handleModeChange);
    tripPointPresenter.init(point);
    this._tripPointPresenter.set(point.id, tripPointPresenter);
  }

  _renderPoints(points) {
    points.forEach((_, i) => this._renderPoint(points[i]));
  }

  _renderNoPoints() {
    render(this._mainContentContainer, this._noPointsComponent , RenderPosition.BEFOREEND);
  }

  _clearPointsList() {
    this._tripPointPresenter.forEach((presenter) => presenter.destroy());
    this._tripPointPresenter.clear();
  }

  _handleTripPointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._tripPointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderTrip() {
    if (this._tripPoints.length > 0) {
      this._renderSort();
      this._renderPointsList();
    } else {
      this._renderNoPoints();
    }
  }
}
