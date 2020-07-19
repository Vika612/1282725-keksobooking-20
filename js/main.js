'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');


  var activatePage = function () {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.mainPin.removeErrorMessage();
    window.form.activate();
  };

  var deactivatePage = function () {
    mapBlock.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.map.removePins();
    window.card.closePopupCard();
    window.form.getMinPriceFromType();
    window.photo.removePhoto();
    window.photo.removeHousePhotos();
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

