'use strict';

(function () {
  var DEFAULT_FILTER = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var filterHousingType = (function (adv) {
    return housingType.value === DEFAULT_FILTER || housingType.value === adv.offer.type;
  });

  var filterUpdate = function () {
    var filterValue = window.mainPin.arrayOffers.filter(filterHousingType);
    window.map.generatePins(filterValue);
  };

  mapFilters.addEventListener('change', (function () {
    window.card.closePopupCard();
    window.map.removePins();
    filterUpdate();
  }));

  window.filter = {
    filterUpdate: filterUpdate
  };

}());
