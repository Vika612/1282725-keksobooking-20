'use strict';

(function () {

  var COUNT = 8;
  var mapBlock = document.querySelector('.map');
  var currentAd = document.querySelector('.map__filters-container');

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

  var renderCard = function (adv) {
    closePopupCard();
    mapBlock.insertBefore(window.card.createCard(adv), currentAd);
  };

  var closePopupCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    document.removeEventListener('keydown', onPopupCloseKeydown);
  };

  var onPopupCloseKeydown = function (evt) {
    if (evt.key === 'Escape' || evt.button === 0) {
      evt.preventDefault();
      window.map.closePopupCard();
    }
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
    mapBlock: mapBlock,
    generateAds: generateAds,
    generatePins: generatePins,
    renderCard: renderCard,
    closePopupCard: closePopupCard,
    onMapPinMousedown: onMapPinMousedown,
    onMapPinKeydown: onMapPinKeydown,
    onPopupCloseKeydown: onPopupCloseKeydown,
  };

}());
