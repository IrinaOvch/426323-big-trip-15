import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/route-info.js';
import SiteFiltersView from './view/site-filters.js';
import SiteSortingView from './view/site-sorting.js';
import EditPointFormView from './view/edit-point-form.js';
import PointsListView from './view/points-list.js';
import TripPointView from './view/trip-point.js';
import EmptyPointsListView from './view/empty-points-list-message.js';
import {generateTripPoints} from './mock/trip-point.js';
import {renderElement, RenderPosition, isEscPressed} from './utils.js';
// import {createAddNewPointFormTemplate} from './view/add-new-point-form.js';

const POINTS_AMOUNT = 20;

const points = generateTripPoints(POINTS_AMOUNT);

const siteNavigationContainer = document.querySelector('.trip-controls__navigation');
const mainInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContentContainer = document.querySelector('.trip-events');

renderElement(siteNavigationContainer, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainInfoContainer, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);
renderElement(filtersContainer, new SiteFiltersView().getElement(), RenderPosition.BEFOREEND);

if (points.length > 0) {
  renderElement(mainContentContainer, new SiteSortingView().getElement(), RenderPosition.BEFOREEND);
}

const pointsListComponent = new PointsListView();


const renderTripPoint = (pointsListElement, point) => {
  const tripPointComponent = new TripPointView(point);
  const tripPointEditComponent = new EditPointFormView(point);

  const replaceFormToCard = () => {
    pointsListElement.replaceChild(tripPointComponent.getElement(), tripPointEditComponent.getElement());
  };

  const replaceCardToForm = () => {
    pointsListElement.replaceChild(tripPointEditComponent.getElement(), tripPointComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      replaceFormToCard();
    }
    document.removeEventListener('keydown', onEscKeyDown);
  };

  tripPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripPointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
  });

  tripPointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
  });

  tripPointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  renderElement(pointsListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

if (points.length > 0) {
  renderElement(mainContentContainer, pointsListComponent.getElement(), RenderPosition.BEFOREEND);
  points.slice(1).forEach((_, i) => renderTripPoint(pointsListComponent.getElement(), points[i], i));
} else {
  renderElement(mainContentContainer, new EmptyPointsListView().getElement() , RenderPosition.BEFOREEND);
}
