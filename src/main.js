import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/route-info.js';
import SiteFiltersView from './view/site-filters.js';
import SiteSortingView from './view/site-sorting.js';
import EditPointFormView from './view/edit-point-form.js';
import PointsListView from './view/points-list.js';
import TripPointView from './view/trip-point.js';
import EmptyPointsListView from './view/empty-points-list-message.js';
import {generateTripPoints} from './mock/trip-point.js';
import {isEscPressed} from './utils/common.js';
import {render, RenderPosition, replace} from './utils/render.js';
// import {createAddNewPointFormTemplate} from './view/add-new-point-form.js';

const POINTS_AMOUNT = 20;

const points = generateTripPoints(POINTS_AMOUNT);

const siteNavigationContainer = document.querySelector('.trip-controls__navigation');
const mainInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContentContainer = document.querySelector('.trip-events');

render(siteNavigationContainer, new SiteMenuView(), RenderPosition.BEFOREEND);
render(mainInfoContainer, new TripInfoView(points), RenderPosition.AFTERBEGIN);
render(filtersContainer, new SiteFiltersView(), RenderPosition.BEFOREEND);

if (points.length > 0) {
  render(mainContentContainer, new SiteSortingView(), RenderPosition.BEFOREEND);
}

const pointsListComponent = new PointsListView();


const renderTripPoint = (pointsListElement, point) => {
  const tripPointComponent = new TripPointView(point);
  const tripPointEditComponent = new EditPointFormView(point);

  const replaceFormToCard = () => {
    replace(tripPointComponent, tripPointEditComponent);
  };

  const replaceCardToForm = () => {
    replace(tripPointEditComponent, tripPointComponent);
  };

  const onEscKeyDown = (evt) => {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      replaceFormToCard();
    }
    document.removeEventListener('keydown', onEscKeyDown);
  };

  tripPointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripPointEditComponent.setEditClickHandler(() => {
    replaceFormToCard();
  });

  tripPointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointsListElement, tripPointComponent, RenderPosition.BEFOREEND);
};

if (points.length > 0) {
  render(mainContentContainer, pointsListComponent, RenderPosition.BEFOREEND);
  points.slice(1).forEach((_, i) => renderTripPoint(pointsListComponent, points[i], i));
} else {
  render(mainContentContainer, new EmptyPointsListView() , RenderPosition.BEFOREEND);
}
