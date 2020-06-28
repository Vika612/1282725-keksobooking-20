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
      fragment.appendChild(window.pin.create(createAdvert[i]));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };


  window.map = {
    generatePins: generatePins,
  };

}());
