import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/route-info.js';
import {generateTripPoints} from './mock/trip-point.js';
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';

const POINTS_AMOUNT = 20;
const points = generateTripPoints(POINTS_AMOUNT);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteNavigationContainer = document.querySelector('.trip-controls__navigation');
const mainInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContentContainer = document.querySelector('.trip-events');

render(siteNavigationContainer, new SiteMenuView(), RenderPosition.BEFOREEND);
render(mainInfoContainer, new TripInfoView(points), RenderPosition.AFTERBEGIN);

const tripPresenter = new TripPresenter(mainContentContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();

const button = document.querySelector('.trip-main__event-add-btn');
button.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
