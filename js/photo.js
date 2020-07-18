'use strict';

(function () {

  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var housePhotoFileChooser = document.querySelector('#images');
  var housePreview = document.querySelector('.ad-form__photo');
  var houseUpload = document.querySelector('.ad-form__upload');


  var loadPhoto = function (file, preview) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
    }
    reader.addEventListener('load', function () {
      preview.src = reader.result;
      housePreview.remove();
    });
    reader.readAsDataURL(file);
  };

  var createHousePhotos = function (fileChooser) {
    var file = fileChooser.files[0];
    if (file) {
      var housePhoto = document.createElement('img');
      var container = document.createElement('div');
      container.classList.add('ad-form__photo');
      housePhoto.alt = 'Фото жилья';
      housePhoto.width = 70;
      housePhoto.height = 70;
      container.appendChild(housePhoto);
      houseUpload.insertAdjacentElement('afterend', container);
      loadPhoto(file, housePhoto);
    }
  };

  var removeHousePhotos = function () {
    var housePhotoPreview = document.querySelectorAll('.ad-form__photo');
    if (housePhotoPreview) {
      housePhotoPreview.forEach(function (el) {
        el.remove();
      });
    }
  };

  var removePhoto = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
  };

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    if (file) {
      loadPhoto(file, avatarPreview);
    }
  });

  housePhotoFileChooser.addEventListener('change', function () {
    createHousePhotos(housePhotoFileChooser);
  });

  window.photo = {
    removePhoto: removePhoto,
    removeHousePhotos: removeHousePhotos
  };

}());
