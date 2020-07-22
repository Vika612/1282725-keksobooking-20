'use strict';

(function () {

  var MIN_PRICE = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var MAX_ROOMS = 100;
  var MIN_GUESTS = 0;

  var mapFilters = document.querySelector('.map__filters');
  var filtersFormElements = mapFilters.querySelectorAll('input, select');
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var inputAddress = adForm.querySelector('#address');
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var inputTitle = adForm.querySelector('#title');
  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');


  var setAddress = function (newPositionX, newPositionY) {
    inputAddress.value = newPositionX + ', ' + newPositionY;
  };

  var matchRoomsAndGuests = function () {
    var rooms = roomsNumber.value;
    var guests = guestsNumber.value;
    var message = '';

    if (rooms !== MAX_ROOMS && guests === MIN_GUESTS) {
      message = 'Пожалуйста, выберите количество гостей';
    } else if (rooms === MAX_ROOMS && guests !== MIN_GUESTS) {
      message = 'Извините, размещение гостей невозможно';
    } else if (roomsNumber.value < guestsNumber.value && roomsNumber.value !== MAX_ROOMS) {
      message = 'Количество комнат не должно быть меньше количества гостей';
    }
    guestsNumber.setCustomValidity(message);
  };

  inputTitle.addEventListener('invalid', function () {
    var message = '';

    if (inputTitle.validity.tooShort) {
      message = 'Заголовок объяления должен состоять минимум из 30-х символов';
    } else if (inputTitle.validity.tooLong) {
      message = 'Заголовок объявления не должен превышать 100 символов';
    } else if (inputTitle.validity.valueMissing) {
      message = 'Обязательное поле';
    }
    inputTitle.setCustomValidity(message);
  });

  var syncTime = function (timein, timeout) {
    timeout.value = timein.value;
  };

  timeinSelect.addEventListener('change', function () {
    syncTime(timeinSelect, timeoutSelect);
  });

  timeoutSelect.addEventListener('change', function () {
    syncTime(timeoutSelect, timeinSelect);
  });

  var getMinPriceFromType = function () {
    price.min = price.placeholder = MIN_PRICE[type.value];
  };

  type.addEventListener('change', getMinPriceFromType);


  var activate = function () {
    window.utils.toggleElements(formFieldset, false);
    window.utils.toggleElements(filtersFormElements, false);
    matchRoomsAndGuests();
    getMinPriceFromType();
    roomsNumber.addEventListener('change', matchRoomsAndGuests);
    guestsNumber.addEventListener('change', matchRoomsAndGuests);
  };

  window.form = {
    formFieldset: formFieldset,
    filtersFormElements: filtersFormElements,
    activate: activate,
    setAddress: setAddress,
    getMinPriceFromType: getMinPriceFromType
  };

}());
