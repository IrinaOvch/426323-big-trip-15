import {createSiteMenuTemplate} from './view/site-menu.js';
import {createTripInfoTemplate} from './view/route-info.js';
import {createFiltersTemplate} from './view/site-filters.js';
import {createSortingTemplate} from './view/site-sorting.js';
import {createEditPointFormTemplate} from './view/edit-point-form.js';
import {createPointsListTemplate} from './view/points-list.js';
import {createTripPointTemplate} from './view/trip-point.js';
// import {createAddNewPointFormTemplate} from './view/add-new-point-form.js';

const POINTS_AMOUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteNavigationContainer = document.querySelector('.trip-controls__navigation');
const mainInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContentContainer = document.querySelector('.trip-events');

render(siteNavigationContainer, createSiteMenuTemplate(), 'beforeend');
render(mainInfoContainer, createTripInfoTemplate(), 'afterbegin');
render(filtersContainer, createFiltersTemplate(), 'beforeend');
render(mainContentContainer, createSortingTemplate(), 'beforeend');
render(mainContentContainer, createPointsListTemplate(), 'beforeend');

const pointsList = document.querySelector('.trip-events__list');

render(pointsList, createEditPointFormTemplate(), 'beforeend');

for (let i = 0; i < POINTS_AMOUNT; i++) {
  render(pointsList, createTripPointTemplate(), 'beforeend');
}
