'use strict';

(function () {

  var TYPES_RUS = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  // отрисовка преимуществ

  var renderFeatures = function (features) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
      fragment.appendChild(feature);
    }
    return fragment;
  };

  // отрисовка фотографий

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var photo = document.createElement('img');
      photo.src = photos[i];
      photo.width = PHOTO_WIDTH;
      photo.height = PHOTO_HEIGHT;
      fragment.appendChild(photo);
    }
    return fragment;
  };

  // создаем карточку объявления

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var createCard = function (adv) {
    var newCard = cardTemplate.cloneNode(true);
    var cardFeatures = newCard.querySelector('.popup__features');
    var cardPhotos = newCard.querySelector('.popup__photos');
    var popupClose = newCard.querySelector('.popup__close');

    newCard.querySelector('.popup__title').textContent = adv.offer.title;
    newCard.querySelector('.popup__text--address').textContent = adv.offer.address;
    newCard.querySelector('.popup__text--price').textContent = adv.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = TYPES_RUS[adv.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    newCard.querySelector('.popup__features').innerHTML = '';
    newCard.querySelector('.popup__description').textContent = adv.offer.description;
    newCard.querySelector('.popup__photos').innerHTML = '';
    newCard.querySelector('.popup__avatar').src = adv.author.avatar;

    cardFeatures.appendChild(renderFeatures(adv.offer.features));
    cardPhotos.appendChild(renderPhotos(adv.offer.photos));

    popupClose.addEventListener('click', window.map.onPopupCloseKeydown);

    return newCard;
  };

  window.card = {
    createCard: createCard,
  };

}());
