'use strict';

(function () {
  var MAX_OFFERS = 5;

  var generatePins = function (offers) {
    var fragment = document.createDocumentFragment();

    var pinsOffer = offers.length > MAX_OFFERS ? MAX_OFFERS : offers.length;

    offers.slice(0, pinsOffer).forEach(function (ad) {
      fragment.appendChild(window.pin.create(ad));
    });

    document.querySelector('.map__pins').appendChild(fragment);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.map = {
    generatePins: generatePins,
    removePins: removePins
  };

}());
