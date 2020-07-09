'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 15;

  var pinMain = document.querySelector('.map__pin--main');
  var positionX = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
  var positionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT / 2);

  var setDefaultPosition = function () {
    pinMain.style.left = positionX + 'px';
    pinMain.style.top = positionY + 'px';
  };

  var setCoordinates = function () {
    var newPositionX = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
    var newPositionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    window.form.setAddress(newPositionX, newPositionY);
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

  var onDeactivatePage = function () {
    setDefaultPosition();
    window.form.setAddress(positionX, positionY);

    pinMain.addEventListener('mousedown', onMainPinMousedown);
    pinMain.addEventListener('keydown', onMainPinKeydown);
  };

  onDeactivatePage();

  window.mainPin = {
    setCoordinates: setCoordinates,
    onDeactivatePage: onDeactivatePage
  };

}());
