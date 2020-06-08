'use strict';

document.querySelector('.map').classList.remove('map--faded');

var COUNT = 8;
var TITLES = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8'];
var TYPES_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
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


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomArray = function (array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
};

var createAd = function (i) {
  var locationX = getRandomNumber(0, 1400);
  var locationY = getRandomNumber(130, 630);
  var indexImg = i + 1;

  return {
    author: {
      avatar: 'img/avatars/user0' + indexImg + '.png',
    },
    offer: {
      title: TITLES[i],
      address: locationX + ',' + locationY,
      price: getRandomNumber(0, 50000),
      type: TYPES_OF_HOUSING[i],
      guests: getRandomNumber(1, 10),
      checkin: CHECKING_TIME[i],
      checkout: CHECKOUT_TIME[i],
      features: getRandomArray(FEATURES),
      description: DESCRIPTION[i],
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    }
  };
};

var generateAd = function () {
  var ads = [];

  for (var i = 0; i < COUNT; i++) {
    ads.push(createAd(i));
  }
  return ads;
};

var pin = document.querySelector('#pin')
          .content
          .querySelector('.map__pin');

var createPin = function (adv) {
  var mapPin = pin.cloneNode(true);
  mapPin.style.left = adv.location.x - PIN_GAP_X + 'px';
  mapPin.style.top = adv.location.y - PIN_GAP_Y + 'px';
  mapPin.querySelector('img').alt = adv.offer.title;
  mapPin.querySelector('img').src = adv.author.avatar;

  return mapPin;
};

var generatePins = function () {
  var fragment = document.createDocumentFragment();
  var createAdvert = generateAd();
  for (var i = 0; i < COUNT; i++) {
    fragment.appendChild(createPin(createAdvert[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

generatePins();
