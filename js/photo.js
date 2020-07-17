'use strict';

(function () {

  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var housePhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housePhotoPreview = document.querySelector('.ad-form__photo');

  var resetPhotos = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
    housePhotoPreview.innerHTML = '';
  };

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

  var createHousePhoto = function () {
    var housePhoto = document.createElement('img');
    housePhoto.alt = 'Фото жилья';
    housePhoto.style.width = '70px';
    housePhoto.style.height = '70px';
    housePhotoPreview.appendChild(housePhoto);
    loadPhoto(housePhotoFileChooser, housePhoto);
  };

  avatarFileChooser.addEventListener('change', function () {
    loadPhoto(avatarFileChooser, avatarPreview);
  });

  housePhotoFileChooser.addEventListener('change', function () {
    createHousePhoto();
  });

  window.photo = {
    resetPhotos: resetPhotos
  };

}());
