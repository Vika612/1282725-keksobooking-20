'use strict';

(function () {

  var MIN_PRICE = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};

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


  var toggleElements = function (value) {
    formFieldset.forEach(function (element) {
      element.disabled = value;
    });
  };

  var setAddress = function (newPositionX, newPositionY) {
    inputAddress.value = newPositionX + ', ' + newPositionY;
  };

  var matchRoomsAndGuests = function () {
    var rooms = roomsNumber.value;
    var guests = guestsNumber.value;
    var message = '';

    if (rooms !== '100' && guests === '0') {
      message = 'Пожалуйста, выберите количество гостей';
    } else if (rooms === '100' && guests !== '0') {
      message = 'Извините, размещение гостей невозможно';
    } else if (roomsNumber.value < guestsNumber.value && roomsNumber.value !== '100') {
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
    toggleElements(false);
    matchRoomsAndGuests();
    getMinPriceFromType();
    roomsNumber.addEventListener('change', matchRoomsAndGuests);
    guestsNumber.addEventListener('change', matchRoomsAndGuests);
  };

  window.form = {
    activate: activate,
    toggleElements: toggleElements,
    setAddress: setAddress,
    getMinPriceFromType: getMinPriceFromType
  };

}());
