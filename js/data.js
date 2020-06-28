'use strict';

(function () {
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


  var createAd = function (index) {
    var locationX = window.util.getRandomNumber(0, 1200);
    var locationY = window.util.getRandomNumber(130, 630);
    var indexImg = index + 1;

    return {
      author: {
        avatar: 'img/avatars/user0' + indexImg + '.png',
      },
      offer: {
        title: TITLES[window.util.getRandomNumber(0, TITLES.length - 1)],
        address: locationX + ',' + locationY,
        price: window.util.getRandomNumber(0, 50000),
        type: TYPES_OF_HOUSING[window.util.getRandomNumber(0, TYPES_OF_HOUSING.length - 1)],
        rooms: window.util.getRandomNumber(1, 3),
        guests: window.util.getRandomNumber(1, 10),
        checkin: CHECKING_TIME[window.util.getRandomNumber(0, CHECKING_TIME.length - 1)],
        checkout: CHECKOUT_TIME[window.util.getRandomNumber(0, CHECKOUT_TIME.length - 1)],
        features: window.util.getRandomArray(FEATURES),
        description: DESCRIPTION[window.util.getRandomNumber(0, DESCRIPTION.length - 1)],
        photos: window.util.getRandomArray(PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY,
      }
    };
  };

  window.data = {
    createAd: createAd,
  };

}());
