import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/route-info.js';
import SiteFiltersView from './view/site-filters.js';
import {generateTripPoints} from './mock/trip-point.js';
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';

const POINTS_AMOUNT = 20;
const points = generateTripPoints(POINTS_AMOUNT);

const siteNavigationContainer = document.querySelector('.trip-controls__navigation');
const mainInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContentContainer = document.querySelector('.trip-events');

render(siteNavigationContainer, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filtersContainer, new SiteFiltersView(), RenderPosition.BEFOREEND);
render(mainInfoContainer, new TripInfoView(points), RenderPosition.AFTERBEGIN);

const tripPresenter = new TripPresenter(mainContentContainer);

tripPresenter.init(points);
