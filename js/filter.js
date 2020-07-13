'use strict';

(function () {
  var DEFAULT_FILTER = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var filterHousingType = (function (adv) {
    return housingType.value === DEFAULT_FILTER ? true : housingType.value === adv.offer.type;
  });

  var filterUpdate = function (offers) {
    var filterValue = offers.filter(filterHousingType);
    window.map.generatePins(filterValue);
  };

  var onFilterChange = function () {
    window.card.closePopupCard();
    window.map.removePins();
    window.backend.load(filterUpdate);
  };

  housingType.addEventListener('change', onFilterChange);

}());
