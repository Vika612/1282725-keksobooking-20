'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var pinMain = mapBlock.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');


  var activationPage = function () {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.mainPin.setupAddress();
    window.map.generatePins();
    window.form.activate();
    pinMain.removeEventListener('mousedown', window.map.onMapPinMousedown);
    pinMain.removeEventListener('keydown', window.map.onMapPinKeydown);
  };

  window.main = {
    activationPage: activationPage,
  };

}());

