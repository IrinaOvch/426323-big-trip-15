import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, currentFilterType, isDisabled) => {
  const {type, name} = filter;

  return `<div class="trip-filters__filter">
    <input
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${type === currentFilterType ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
    >
    <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
  </div>`;
};

const createFilterTemplate = (filterItems, currentFilterType, isDisabled) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType, isDisabled))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class SiteFilters extends AbstractView {
  constructor(filters, currentFilterType, isDisabled) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._isDisabled = isDisabled;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter, this._isDisabled);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
