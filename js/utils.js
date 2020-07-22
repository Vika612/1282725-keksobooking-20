'use strict';

(function () {

  var KeyCode = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    LEFT_MOUSE: 0
  };

  var toggleElements = function (elements, value) {
    elements.forEach(function (element) {
      element.disabled = value;
    });
  };


  window.utils = {
    KeyCode: KeyCode,
    toggleElements: toggleElements
  };

}());
