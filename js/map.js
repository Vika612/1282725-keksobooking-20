'use strict';

(function () {

  var COUNT = 8;

  var generateAds = function () {
    var ads = [];

    for (var i = 0; i < COUNT; i++) {
      ads.push(window.data.createAd(i));
    }
    return ads;
  };


  var generatePins = function () {
    var fragment = document.createDocumentFragment();
    var createAdvert = generateAds();

    for (var i = 0; i < COUNT; i++) {
      fragment.appendChild(window.pin.createPin(createAdvert[i]));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };


  var onMapPinMousedown = function (evt) {
    if (evt.button === 0) {
      window.main.activationPage();
    }
  };


  var onMapPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      window.main.activationPage();
    }
  };

  window.map = {
    generatePins: generatePins,
    onMapPinMousedown: onMapPinMousedown,
    onMapPinKeydown: onMapPinKeydown,
  };

}());
