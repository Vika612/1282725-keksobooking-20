'use strict';

(function () {

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomArray = function (array) {
    var newArray = [];
    var newArrayLength = getRandomNumber(1, array.length);

    for (var i = 0; i < newArrayLength; i++) {
      var newArrItem = array[getRandomNumber(0, array.length - 1)];
      if (newArray.includes(newArrItem)) {
        i--;
      } else {
        newArray.push(newArrItem);
      }
    }
    return newArray;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray,
  };

}());
