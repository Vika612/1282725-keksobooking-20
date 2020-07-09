'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 15;

  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');
  var pinCenterPositionX = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
  var pinCenterPositionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT / 2);

  var setDefaultPosition = function () {
    pinMain.style.left = pinCenterPositionX + 'px';
    pinMain.style.top = pinCenterPositionY + 'px';
  };

  var onSuccess = function (offers) {
    window.map.generatePins(offers);
    window.main.activatePage();

    pinMain.removeEventListener('mousedown', onMainPinMousedown);
    pinMain.removeEventListener('keydown', onMainPinKeydown);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.backend.load(onSuccess, onError);
    }
  };

  var onMainPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.backend.load(onSuccess, onError);
    }
  };

  var initPinMainPosition = function () {
    inputAddress.value = pinCenterPositionX + ', ' + pinCenterPositionY;
  };

  var setupAddress = function () {
    var newPinPositionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    var newPinCenterPositionX = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
    inputAddress.value = newPinCenterPositionX + ', ' + newPinPositionY;
  };

  var onDeactivatePage = function () {
    setDefaultPosition();
    initPinMainPosition();

    pinMain.addEventListener('mousedown', onMainPinMousedown);
    pinMain.addEventListener('keydown', onMainPinKeydown);
  };

  onDeactivatePage();

  window.mainPin = {
    setupAddress: setupAddress,
    onDeactivatePage: onDeactivatePage
  };

}());
