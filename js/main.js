'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var formFieldset = adForm.querySelectorAll('.ad-form__element');

  var activatePage = function () {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.mainPin.setupAddress();
    window.form.activate();
    window.mainPin.pinMain.removeEventListener('mousedown', window.mainPin.onMainPinMousedown);
    window.mainPin.pinMain.removeEventListener('keydown', window.mainPin.onMainPinKeydown);
  };

  var deactivatePage = function () {
    mapBlock.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.toggleElements(formFieldset, true);
    window.mainPin.defaultPosition();
    window.map.removePins();
    window.mainPin.pinMain.addEventListener('mousedown', window.mainPin.onMainPinMousedown);
    window.mainPin.pinMain.addEventListener('keydown', window.mainPin.onMainPinKeydown);
  };

  var onSuccessMessage = function () {
    window.message.showMessage('success');
    pageReset();
  };

  var onErrorMessage = function () {
    window.message.showMessage('error');
    pageReset();
  };

  var pageReset = function () {
    adForm.reset();
    deactivatePage();
  };

  adFormReset.addEventListener('click', pageReset);
  adFormReset.addEventListener('keydown', pageReset);

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccessMessage, onErrorMessage);
    deactivatePage();
  };
  adForm.addEventListener('submit', onSubmit);

  window.main = {
    activatePage: activatePage,
  };

}());

