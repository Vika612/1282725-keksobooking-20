'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var formFieldset = adForm.querySelectorAll('.ad-form__element');


  var activatePage = function () {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.mainPin.removeErrorMessage();
    window.form.activate();
  };

  var deactivatePage = function () {
    mapBlock.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.toggleElements(formFieldset, true);
    window.map.removePins();
    window.card.closePopupCard();
    window.form.getMinPriceFromType();
    window.mainPin.onDeactivatePage();
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
    mapFilters.reset();
    window.photo.resetPhotos();
    deactivatePage();
  };

  adFormReset.addEventListener('click', pageReset);
  adFormReset.addEventListener('keydown', pageReset);

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccessMessage, onErrorMessage);
    window.photo.resetPhotos();
    deactivatePage();
  };
  adForm.addEventListener('submit', onSubmit);

  window.main = {
    activatePage: activatePage,
  };

}());

