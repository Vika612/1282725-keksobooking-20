'use strict';

(function () {

  var PIN_TIP_HEIGHT = 15;

  var mapBorder = {
    x: {min: 0, max: 1200},
    y: {min: 130, max: 630},
  };
  var pinMain = document.querySelector('.map__pin--main');
  var maxPinLeft = mapBorder.x.max - pinMain.offsetWidth / 2;
  var minPinLeft = mapBorder.x.min - pinMain.offsetWidth / 2;
  var maxPinTop = mapBorder.y.max - pinMain.offsetHeight - PIN_TIP_HEIGHT;
  var minPinTop = mapBorder.y.min - pinMain.offsetHeight - PIN_TIP_HEIGHT;


  var onMapMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMapMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.mainPin.setCoordinates();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var result = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      if (result.x >= maxPinLeft) {
        result.x = maxPinLeft;
      } else if (result.x <= minPinLeft) {
        result.x = minPinLeft;
      }

      if (result.y >= maxPinTop) {
        result.y = maxPinTop;
      } else if (result.y <= minPinTop) {
        result.y = minPinTop;
      }
      pinMain.style.left = result.x + 'px';
      pinMain.style.top = result.y + 'px';
    };

    var onMapMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.mainPin.setCoordinates();

      document.removeEventListener('mousemove', onMapMouseMove);
      document.removeEventListener('mouseup', onMapMouseUp);
    };

    document.addEventListener('mousemove', onMapMouseMove);
    document.addEventListener('mouseup', onMapMouseUp);
  };

  pinMain.addEventListener('mousedown', onMapMouseDown);

}());
