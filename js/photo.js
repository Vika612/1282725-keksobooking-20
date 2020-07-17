'use strict';

(function () {

  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var housePhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');

  var loadPhoto = function (fileChooser, preview) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();
      }

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var createHousePhotos = function () {
    var housePhoto = document.createElement('img');
    var container = document.createElement('div');

    container.classList.add('ad-form__photo');

    housePhoto.alt = 'Фото жилья';
    housePhoto.width = 70;
    housePhoto.height = 70;

    container.appendChild(housePhoto);
    housePhotoFileChooser.insertAdjacentElement('afterend', container);

    loadPhoto(housePhotoFileChooser, housePhoto);
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
    loadPhoto(avatarFileChooser, avatarPreview);
  });

  housePhotoFileChooser.addEventListener('change', function () {
    createHousePhotos();
  });

  window.photo = {
    removePhoto: removePhoto,
    removeHousePhotos: removeHousePhotos
  };

}());
