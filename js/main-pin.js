'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 15;

  var pinMain = document.querySelector('.map__pin--main');
  var positionX = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
  var positionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT / 2);

  var errorMessage = null;
  var offers = [];

  var getOffers = function () {
    return offers;
  };

  var setDefaultPosition = function () {
    pinMain.style.left = positionX + 'px';
    pinMain.style.top = positionY + 'px';
  };

  var setCoordinates = function () {
    var newPositionX = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
    var newPositionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    window.form.setAddress(newPositionX, newPositionY);
  };

  var onSuccess = function (data) {
    offers = data;
    window.filter.updateOffers();
    window.main.activatePage();

    pinMain.removeEventListener('mousedown', onMainPinMousedown);
    pinMain.removeEventListener('keydown', onMainPinKeydown);
  };

  var onError = function (errMessage) {
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-show');

    errorMessage.textContent = errMessage;
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  var removeErrorMessage = function () {
    if (errorMessage) {
      errorMessage.remove();
    }
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
    window.form.toggleElements(true);
    window.form.setAddress(positionX, positionY);

    pinMain.addEventListener('mousedown', onMainPinMousedown);
    pinMain.addEventListener('keydown', onMainPinKeydown);
  };

  onDeactivatePage();

  window.mainPin = {
    getOffers: getOffers,
    setCoordinates: setCoordinates,
    onDeactivatePage: onDeactivatePage,
    removeErrorMessage: removeErrorMessage
  };

}());
