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
  var mapBorder = {
    x: {min: 0, max: 1200},
    y: {min: 130, max: 630},
  };


  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.main.activatePage();
    }
    pinMain.removeEventListener('mousedown', onMainPinMousedown);
    pinMain.removeEventListener('keydown', onMainPinKeydown);
  };


  var onMainPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.main.activatePage();
    }
    pinMain.removeEventListener('mousedown', onMainPinMousedown);
    pinMain.removeEventListener('keydown', onMainPinKeydown);
  };


  var initlPinMainPosition = function () {
    inputAddress.value = pinCenterPositionX + ', ' + pinCenterPositionY;
  };
  initlPinMainPosition();


  var setupAddress = function () {
    var newPinPositionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    var newPinCenterPositionX = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
    inputAddress.value = newPinCenterPositionX + ', ' + newPinPositionY;
  };

  pinMain.addEventListener('mousedown', onMainPinMousedown);
  pinMain.addEventListener('keydown', onMainPinKeydown);


  var onMapMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMapMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      setupAddress();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';

      if (pinMain.offsetLeft >= mapBorder.x.max - pinMain.offsetWidth / 2) {
        pinMain.style.left = mapBorder.x.max - pinMain.offsetWidth / 2 + 'px';
      }

      if (pinMain.offsetLeft <= mapBorder.x.min - pinMain.offsetWidth / 2) {
        pinMain.style.left = mapBorder.x.min - pinMain.offsetWidth / 2 + 'px';
      }

      if (pinMain.offsetTop >= mapBorder.y.max - pinMain.offsetHeight - PIN_TIP_HEIGHT) {
        pinMain.style.top = mapBorder.y.max - pinMain.offsetHeight - PIN_TIP_HEIGHT + 'px';
      }

      if (pinMain.offsetTop <= mapBorder.y.min - pinMain.offsetHeight - PIN_TIP_HEIGHT) {
        pinMain.style.top = mapBorder.y.min - pinMain.offsetHeight - PIN_TIP_HEIGHT + 'px';
      }
    };


    var onMapMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setupAddress();

      document.removeEventListener('mousemove', onMapMouseMove);
      document.removeEventListener('mouseup', onMapMouseUp);
    };

    document.addEventListener('mousemove', onMapMouseMove);
    document.addEventListener('mouseup', onMapMouseUp);
  };

  pinMain.addEventListener('mousedown', onMapMouseDown);

  window.mainPin = {
    setupAddress: setupAddress,
  };

}());
