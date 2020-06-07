'use strict';

//временное решение: активное состояние для тестирования функции генерации похожих объявлений

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

//функция подбора случайного числа

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

//функция создания массива случайной длины

var getRandomArray = function (array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
};

//функция создания массива из 8-ми сгенерированных js-объектов

var createAd = function () {
  for (var i = 0; i < 8; i++) {
    var locationX = getRandomNumber(0, 1200);
    var locationY = getRandomNumber(130, 630);

  author: {
    avatar: img/avatars/user0
  }
  offer: {
    title: TITLES[i]
    address: locationX + ',' + locationY
    price: getRandomNumber(0, 50000)
    type: TYPES_OF_HOUSING[i]
    guests: getRandomNumber(1, 10)
    checkin: CHECKING_TIME[i]
    checkout: CHECKOUT_TIME[i]
    features: getRandomArray(FEATURES)
    description: DESCRIPTION[i]
    photos: getRandomArray(PHOTOS)
  }
  location: {
    x: locationX
    y: locationY
  }
};
