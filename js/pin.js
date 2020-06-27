'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var createPin = function (adv) {
    var pin = pinTemplate.cloneNode(true);
    var mapImg = pin.querySelector('img');

    pin.style.left = adv.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = adv.location.y - PIN_HEIGHT + 'px';
    mapImg.alt = adv.offer.title;
    mapImg.src = adv.author.avatar;

    pin.addEventListener('click', function () {
      window.map.renderCard(adv);
      document.addEventListener('keydown', window.map.onPopupCloseKeydown);
    });

    return pin;
  };

  window.pin = {
    createPin: createPin,
  };

}());