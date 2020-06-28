'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var pinMain = mapBlock.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');


  window.form.toggleElements(formFieldset, true);

  // переход страницы в активное состояние

  var activationPage = function () {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.toggleElements(formFieldset, false);
    window.mainPin.setupAddress();
    window.map.generatePins();
    window.form.matchRoomsAndGuests();
    window.form.getMinPriceFromType();
    pinMain.removeEventListener('mousedown', window.map.onMapPinMousedown);
    pinMain.removeEventListener('keydown', window.map.onMapPinKeydown);
    roomsNumber.addEventListener('change', window.form.matchRoomsAndGuests);
    guestsNumber.addEventListener('change', window.form.matchRoomsAndGuests);
  };

  window.main = {
    activationPage: activationPage,
  };

}());

