import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/route-info.js';
import {render, RenderPosition, remove} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import Api from './api.js';
import AppDataModel from './model/app-data.js';
import {UpdateType, MenuItem} from './const.js';
import StatsView from './view/stats.js';

let statisticsComponent = null;
const AUTHORIZATION = 'Basic flkdsdffsjdfsjofsk994';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const siteNavigationContainer = document.querySelector('.trip-controls__navigation');
const mainInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContentContainer = document.querySelector('.trip-events');

const api = new Api(END_POINT, AUTHORIZATION);
const siteMenuComponent = new SiteMenuView();


const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const appDataModel = new AppDataModel();

const tripPresenter = new TripPresenter(mainContentContainer, pointsModel, filterModel, appDataModel, api);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);

const button = document.querySelector('.trip-main__event-add-btn');
button.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      tripPresenter.destroy();
      statisticsComponent = new StatsView(pointsModel.getPoints());
      render(mainContentContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
    case MenuItem.TABLE:
      remove(statisticsComponent);
      tripPresenter.init();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

render(siteNavigationContainer, siteMenuComponent, RenderPosition.BEFOREEND);

api.getData()
  .then((data) => {
    const [points, offers, destinations] = data;
    appDataModel.setOffers(offers);
    appDataModel.setDestinations(destinations);
    pointsModel.setPoints(UpdateType.INIT, points);
    render(mainInfoContainer, new TripInfoView(points), RenderPosition.AFTERBEGIN);
  })
  .catch((err) => {
    pointsModel.setPoints(UpdateType.INIT, []);
    tripPresenter.renderErrorMessage(err);
  });

filterPresenter.init();
tripPresenter.init();
