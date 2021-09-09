export default class AppData {
  constructor() {
    this._offers = [];
    this._destinations = [];
  }

  setOffers(offers) {
    this._offers = offers;
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  getOffers() {
    return this._offers;
  }

  getDestinations() {
    return this._destinations;
  }

  static adaptOfferToClient(offer) {
    const adaptedOffer = Object.assign(
      {},
      offer,
      {
        name: offer['type'],
      },
    );

    delete adaptedOffer['type'];

    return adaptedOffer;
  }
}
