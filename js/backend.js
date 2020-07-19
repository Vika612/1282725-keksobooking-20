'use strict';

(function () {

  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var SUCCESS_CODE = 200;


  var request = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' секунд');
    });
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    request(xhr, onSuccess, onError);
    xhr.open('GET', URL_GET);
    xhr.send();

  };

  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    request(xhr, onSuccess, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
