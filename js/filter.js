'use strict';

(function () {
  var DEFAULT_FILTER = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  // var housingPrice = mapFilters.querySelector('#housing-price');
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

  var updateOffers = function () {
    var filterValue = window.mainPin.getOffers().filter(filterHousingType).filter(filterHousingRooms).filter(filterHousingGuests);
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
