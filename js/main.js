'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var pinMain = mapBlock.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');


  var activationPage = function () {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.mainMark.setupAddress();
    window.map.generatePins();
    window.form.activate();
    pinMain.removeEventListener('mousedown', window.mainMark.onMapPinMousedown);
    pinMain.removeEventListener('keydown', window.mainMark.onMapPinKeydown);
  };

  window.main = {
    activationPage: activationPage,
  };

}());

