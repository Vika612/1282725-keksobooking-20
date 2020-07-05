'use strict';

(function () {

  var COUNT = 9;

  var generatePins = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < COUNT; i++) {
      fragment.appendChild(window.pin.create(offers[i]));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.map = {
    generatePins: generatePins,
  };

}());
