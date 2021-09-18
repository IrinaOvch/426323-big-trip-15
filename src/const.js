const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const MenuItem = {
  STATS: 'Stats',
  TABLE: 'Table',
};

export {SortType, UserAction, UpdateType, FilterType, MenuItem};
