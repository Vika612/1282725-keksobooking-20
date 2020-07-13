'use strict';

(function () {

  var generatePins = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.create(offers[i]));
    }
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
