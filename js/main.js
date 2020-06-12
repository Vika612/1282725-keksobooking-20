'use strict';

var COUNT = 8;
var TITLES = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8'];
var TYPES_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_RUS = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var CHECKING_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_GAP_X = 50;
var PIN_GAP_Y = 70;

var mapBlock = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');

// случайное число

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// массив случайной длины

var getRandomArray = function (array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
};

// создаем объект объявление

var createAd = function (index) {
  var locationX = getRandomNumber(0, 1400);
  var locationY = getRandomNumber(130, 630);
  var indexImg = index + 1;

  return {
    author: {
      avatar: 'img/avatars/user0' + indexImg + '.png',
    },
    offer: {
      title: TITLES[index],
      address: locationX + ',' + locationY,
      price: getRandomNumber(0, 50000),
      type: TYPES_OF_HOUSING[index],
      guests: getRandomNumber(1, 10),
      checkin: CHECKING_TIME[index],
      checkout: CHECKOUT_TIME[index],
      features: getRandomArray(FEATURES),
      description: DESCRIPTION[index],
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    }
  };
};

// генерируем массив объявлений

var generateAds = function () {
  var ads = [];

  for (var i = 0; i < COUNT; i++) {
    ads.push(createAd(i));
  }
  return ads;
};

// карта переведена в активное состояние

mapBlock.classList.remove('map--faded');

// генерируем и добавляем метки на карту

var createPin = function (adv) {
  var mapPin = pin.cloneNode(true);
  var mapImg = mapPin.querySelector('img');

  mapPin.style.left = adv.location.x - PIN_GAP_X + 'px';
  mapPin.style.top = adv.location.y - PIN_GAP_Y + 'px';
  mapImg.alt = adv.offer.title;
  mapImg.src = adv.author.avatar;

  return mapPin;
};

var generatePins = function () {
  var fragment = document.createDocumentFragment();
  var createAdvert = generateAds();

  for (var i = 0; i < COUNT; i++) {
    fragment.appendChild(createPin(createAdvert[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

generatePins();

var ads = generateAds();

// создаем карточку объявления

var createCard = function (card) {
  var newCard = templateCard.cloneNode(true);

  newCard.querySelector('.popup__title').textContent = card.offer.title;
  newCard.querySelector('.popup__text--address').textContent = card.offer.address;
  newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = TYPES_RUS[card.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  newCard.querySelector('.popup__features').innerHTML = '';
  newCard.querySelector('.popup__description').textContent = card.offer.description;
  newCard.querySelector('.popup__photos').innerHTML = '';
  newCard.querySelector('.popup__avatar').src = card.author.avatar;

  return newCard;
};

// добавляем карточку объявления на карту

var currentAd = document.querySelector('.map__filters-container');
mapBlock.insertBefore(createCard(ads[0]), currentAd);
