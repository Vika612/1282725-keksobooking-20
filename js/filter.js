'use strict';

(function () {
  var DEFAULT_FILTER = 'any';
  var Price = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MIN: 10000,
    MAX: 50000
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');


  var filterHousingType = (function (adv) {
    return housingType.value === DEFAULT_FILTER || housingType.value === adv.offer.type;
  });

  var filterHousingRooms = function (adv) {
    return housingRooms.value === DEFAULT_FILTER || Number(housingRooms.value) === adv.offer.rooms;
  };

  var filterHousingGuests = function (adv) {
    return housingGuests.value === DEFAULT_FILTER || Number(housingGuests.value) === adv.offer.guests;
  };

  var filterHousingPrice = function (adv) {
    switch (housingPrice.value) {
      case Price.LOW:
        return adv.offer.price < Price.MIN;
      case Price.MIDDLE:
        return adv.offer.price >= Price.MIN && adv.offer.price < Price.MAX;
      case Price.HIGH:
        return adv.offer.price >= Price.MAX;
      default:
        return DEFAULT_FILTER;
    }
  };

  var filters = [filterHousingType, filterHousingPrice, filterHousingRooms, filterHousingGuests];

  var checkFilter = function (adv) {
    return filters.every(function (filter) {
      return filter(adv);
    });
  };

  var updateOffers = function () {
    var filterValue = window.mainPin.getOffers().filter(checkFilter);
    window.map.generatePins(filterValue);
  };

  mapFilters.addEventListener('change', (function () {
    window.card.closePopupCard();
    window.map.removePins();
    updateOffers();
  }));

  window.filter = {
    updateOffers: updateOffers
  };

}());
