'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');


  var activatePage = function () {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.mainPin.setupAddress();
    window.map.generatePins();
    window.form.activate();
  };

  window.main = {
    activatePage: activatePage,
  };

}());

