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
    window.backend.load(onSuccess, onError);
  };

  var deactivatePage = function () {
    mapBlock.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var onSuccess = function (offers) {
    window.map.generatePins(offers);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var pageReset = function () {
    adForm.reset();
  };

  adFormReset.addEventListener('click', pageReset);
  adFormReset.addEventListener('keydown', pageReset);

  var onSuccessMessage = function () {
    window.message.showMessage('success');

    document.addEventListener('click', window.message.closeMessage);
    document.addEventListener('keydown', window.message.closeMessage);
    pageReset();
  };

  var onErrorMessage = function () {
    window.message.showMessage('error');
    document.addEventListener('click', window.message.closeMessage);
    document.addEventListener('keydown', window.message.closeMessage);

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', window.message.closeMessage);
    pageReset();
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccessMessage, onErrorMessage);
    window.form.toggleElements(formFieldset, true);
    deactivatePage();
  };
  adForm.addEventListener('submit', onSubmit);

  window.main = {
    activatePage: activatePage,
  };

}());

