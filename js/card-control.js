'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var currentAd = document.querySelector('.map__filters-container');

  var renderCard = function (adv) {
    closePopupCard();
    mapBlock.insertBefore(window.card.createCard(adv), currentAd);
  };


  var closePopupCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    document.removeEventListener('keydown', onPopupCloseKeydown);
  };


  var onPopupCloseKeydown = function (evt) {
    if (evt.key === 'Escape' || evt.button === 0) {
      evt.preventDefault();
      closePopupCard();
    }
  };

  window.cardControl = {
    renderCard: renderCard,
    onPopupCloseKeydown: onPopupCloseKeydown,
  };

}());
