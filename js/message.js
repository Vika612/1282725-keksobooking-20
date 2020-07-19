'use strict';

(function () {

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var mainBlock = document.querySelector('main');
  var successText = successTemplate.cloneNode(true);
  var errorText = errorTemplate.cloneNode(true);


  var showMessage = function (result) {
    switch (result) {
      case 'success':
        document.body.appendChild(successText);
        break;
      case 'error':
        mainBlock.appendChild(errorText);
        break;
    }
    document.addEventListener('click', window.message.closeMessage);
    document.addEventListener('keydown', window.message.closeMessage);
  };

  var closeMessage = function (evt) {
    if (successText || errorText && evt.key === window.util.KeyCode.ESCAPE
      || evt.button === window.util.KeyCode.LEFT_MOUSE) {
      successText.remove();
      errorText.remove();
    }
    document.removeEventListener('click', closeMessage);
    document.removeEventListener('keydown', closeMessage);
  };

  window.message = {
    closeMessage: closeMessage,
    showMessage: showMessage,
  };

})();
