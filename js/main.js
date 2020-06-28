'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var pinMain = mapBlock.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');

  window.form.toggleElements(formFieldset, true);

  // переход страницы в активное состояние

  var activationPage = function () {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.mainPin.setupAddress();
    window.map.generatePins();
    window.form.setActivationPage();
    pinMain.removeEventListener('mousedown', window.map.onMapPinMousedown);
    pinMain.removeEventListener('keydown', window.map.onMapPinKeydown);
  };

  window.main = {
    activationPage: activationPage,
  };

}());

