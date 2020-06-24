'use strict';

var COUNT = 8;
var TITLES = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8'];
var TYPES_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_RUS = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var MIN_PRICE = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
var CHECKING_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var PIN_TIP_HEIGHT = 22;

var mapBlock = document.querySelector('.map');

// случайное число

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// массив случайной длины

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

// создаем объект объявление

var createAd = function (index) {
  var locationX = getRandomNumber(0, 1200);
  var locationY = getRandomNumber(130, 630);
  var indexImg = index + 1;

  return {
    author: {
      avatar: 'img/avatars/user0' + indexImg + '.png',
    },
    offer: {
      title: TITLES[getRandomNumber(0, TITLES.length - 1)],
      address: locationX + ',' + locationY,
      price: getRandomNumber(0, 50000),
      type: TYPES_OF_HOUSING[getRandomNumber(0, TYPES_OF_HOUSING.length - 1)],
      rooms: getRandomNumber(1, 3),
      guests: getRandomNumber(1, 10),
      checkin: CHECKING_TIME[getRandomNumber(0, CHECKING_TIME.length - 1)],
      checkout: CHECKOUT_TIME[getRandomNumber(0, CHECKOUT_TIME.length - 1)],
      features: getRandomArray(FEATURES),
      description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
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

// ===================================================

// генерируем и добавляем метки на карту

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
    renderCard(adv);
    document.addEventListener('keydown', onPopupCloseKeydown);
  });

  return pin;
};

var generatePins = function () {
  var fragment = document.createDocumentFragment();
  var createAdvert = generateAds();

  for (var i = 0; i < COUNT; i++) {
    fragment.appendChild(createPin(createAdvert[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

// ================================================

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

  popupClose.addEventListener('click', onPopupCloseKeydown);

  return newCard;
};

var renderCard = function (adv) {
  closePopupCard();
  mapBlock.insertBefore(createCard(adv), currentAd);
};

// закрываем карточку объявления

var closePopupCard = function () {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  }
  document.removeEventListener('keydown', onPopupCloseKeydown);
};

// с помощью ESC  и  ENTER

var onPopupCloseKeydown = function (evt) {
  if (evt.key === 'Escape' || evt.button === 0) {
    evt.preventDefault();
    closePopupCard();
  }
};

// добавляем карточку объявления на карту

var currentAd = document.querySelector('.map__filters-container');

// ===============================================================
// module4-task2

var pinMain = mapBlock.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formFieldset = adForm.querySelectorAll('fieldset');
var inputAddress = adForm.querySelector('#address');
var pinCenterPositionX = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
var pinCenterPositionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT / 2);

// блокировка/разблокировка полей ввода формы

var toggleElements = function (element, value) {
  for (var i = 0; i < element.length; i++) {
    element[i].disabled = value;
  }
};

toggleElements(formFieldset, true);

// переход страницы в активное состояние

var activationPage = function () {
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  toggleElements(formFieldset, false);
  setupAddress();
  generatePins();
  matchRoomsAndGuests();
  getMinPriceFromType();
  pinMain.removeEventListener('mousedown', onMapPinMousedown);
  pinMain.removeEventListener('keydown', onMapPinKeydown);
  roomsNumber.addEventListener('change', matchRoomsAndGuests);
  guestsNumber.addEventListener('change', matchRoomsAndGuests);
};

// обработка событий

var onMapPinMousedown = function (evt) {
  if (evt.button === 0) {
    activationPage();
  }
};

var onMapPinKeydown = function (evt) {
  if (evt.key === 'Enter') {
    activationPage();
  }
};

pinMain.addEventListener('mousedown', onMapPinMousedown);
pinMain.addEventListener('keydown', onMapPinKeydown);

// начальное положение главного пина

var initlPinMainPosition = function () {
  inputAddress.value = pinCenterPositionX + ', ' + pinCenterPositionY;
};
initlPinMainPosition();

// положение главного пина после активации

var setupAddress = function () {
  var newPinPositionY = Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
  inputAddress.value = pinCenterPositionX + ', ' + newPinPositionY;
};

// ==================================================

// валидация формы

var roomsNumber = adForm.querySelector('#room_number');
var guestsNumber = adForm.querySelector('#capacity');
var timeinSelect = adForm.querySelector('#timein');
var timeoutSelect = adForm.querySelector('#timeout');
var price = adForm.querySelector('#price');
var type = adForm.querySelector('#type');

// соответствие количества гостей с количеством комнат

var matchRoomsAndGuests = function () {
  var rooms = roomsNumber.value;
  var guests = guestsNumber.value;
  var message = '';

  if (rooms !== '100' && guests === '0') {
    message = 'Пожалуйста, выберите количество гостей';
  } else if (rooms === '100' && guests !== '0') {
    message = 'Извините, размещение гостей невозможно';
  } else if (roomsNumber.value < guestsNumber.value && roomsNumber.value !== '100') {
    message = 'Количество комнат не должно быть меньше количества гостей';
  }
  guestsNumber.setCustomValidity(message);
};

// заголовок объявления

var inputTitle = adForm.querySelector('#title');

inputTitle.addEventListener('invalid', function () {
  var message = '';

  if (inputTitle.validity.tooShort) {
    message = 'Заголовок объяления должен состоять минимум из 30-х символов';
  } else if (inputTitle.validity.tooLong) {
    message = 'Заголовок объявления не должен превышать 100 символов';
  } else if (inputTitle.validity.valueMissing) {
    message = 'Обязательное поле';
  }
  inputTitle.setCustomValidity(message);
});

// синхронизация полей checkin/checkout

var syncTime = function (timein, timeout) {
  timeout.value = timein.value;
};

timeinSelect.addEventListener('change', function () {
  syncTime(timeinSelect, timeoutSelect);
});

timeoutSelect.addEventListener('change', function () {
  syncTime(timeoutSelect, timeinSelect);
});

// синхронизация типа жилья и минимальной цены

var getMinPriceFromType = function () {
  price.min = price.placeholder = MIN_PRICE[type.value];
};

type.addEventListener('change', getMinPriceFromType);
