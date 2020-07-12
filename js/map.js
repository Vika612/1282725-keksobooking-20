'use strict';

(function () {

  var MAX_OFFERS = 5;
  var mapPins = document.querySelector('.map__pins');

  /* var generatePins = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.create(offers[i]));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  }; */

  var arrayOffers = [];

  var generatePins = function (offers) {
    var fragment = document.createDocumentFragment();
    var length = offers.length < MAX_OFFERS ? offers.length : MAX_OFFERS;

    for (var i = 0; i < length; i++) {
      fragment.appendChild(window.pin.create(offers[i]));
    }
    mapPins.appendChild(fragment);
    return mapPins;
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.map = {
    generatePins: generatePins,
    removePins: removePins,
    arrayOffers: arrayOffers
  };

}());
