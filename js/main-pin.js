'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 22;

  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');
  var pinCenterPositionX = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
  var pinCenterPositionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT / 2);


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

  // начальное положение главного пина

  var initlPinMainPosition = function () {
    inputAddress.value = pinCenterPositionX + ', ' + pinCenterPositionY;
  };
  initlPinMainPosition();

  // положение главного пина после активации

  var setupAddress = function () {
    var newPinPositionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    inputAddress.value = pinCenterPositionX + ', ' + newPinPositionY;
  };

  pinMain.addEventListener('mousedown', onMapPinMousedown);
  pinMain.addEventListener('keydown', onMapPinKeydown);

  window.mainPin = {
    setupAddress: setupAddress,
    onMapMousedown: onMapPinMousedown,
    onMapKeydown: onMapPinKeydown,
  };

}());
