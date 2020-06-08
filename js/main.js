'use strict';

document.querySelector('.map').classList.remove('map--faded');

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
var mapPins = document.querySelector('.map__pins');


var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

var getRandomArray = function (array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
};

var createAd = function () {
  var allAds = [];

  for (var i = 0; i < 8; i++) {
    var locationX = getRandomNumber(0, 1400);
    var locationY = getRandomNumber(130, 630);
    var indexImg = i + 1;

    var ad = {
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
    allAds[i] = ad;
  }
  return allAds;
};

var ads = createAd();

var createPin = function () {
  var pinFragment = document.createDocumentFragment();
  var pin = document.querySelector('#pin').content;
  var newPin = pin.cloneNode(true);
  pinFragment.appendChild(newPin);
  return pinFragment;
};

var createPins = function (ad) {
  var fragment = document.createDocumentFragment();
  var mapPin = document.querySelector('.map__pin');
  for (var j = 0; j < ad.length; j++) {
    var pin = createPin();
    pin.querySelector('.map__pin').style.left = ad[j].location.x + (mapPin.offsetWidth / 2) + 'px';
    pin.querySelector('.map__pin').style.top = ad[j].location.y - mapPin.offsetHeight + 'px';
    pin.querySelector('img').src = ad[j].author.avatar;
    pin.querySelector('img').alt = ad[j].offer.title;
    fragment.appendChild(pin);
  }
  return fragment;
};

var renderPins = function (ad) {
  var newMapPins = createPins(ad);
  mapPins.appendChild(newMapPins);
};

renderPins(ads);
