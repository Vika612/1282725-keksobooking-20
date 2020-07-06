'use strict';

(function () {

  var generatePins = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.create(offers[i]));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.map = {
    generatePins: generatePins,
  };

}());
