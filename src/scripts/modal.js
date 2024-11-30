function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown',closeModalByEsc);
};

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
};

function getOpenedPopup() {
  return document.querySelector('.popup_is-opened');
};

function checkModalButton(evt) {
  return evt.target.classList.contains('popup__close');
};

function checkModalOverlay(evt) {
  return evt.target.classList.contains('popup');
};

function checkModalEsc(evt) {
  return evt.key === 'Escape';
};

function closeModalByEsc (evt) {
  if (checkModalEsc(evt)) {
    closeModal(getOpenedPopup());
  };
};

function closeModalByOverlay(evt) {
  if (checkModalButton(evt) || checkModalOverlay(evt)) {
    closeModal(evt.currentTarget);
  };
};

export {openModal, closeModal, closeModalByOverlay}