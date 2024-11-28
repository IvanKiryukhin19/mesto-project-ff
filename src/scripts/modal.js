function openModal(popup) {
  popup.classList.toggle('popup_is-opened');
}

function closeModal() {
  const popup=openedPopup();
  popup.classList.toggle('popup_is-opened');
  return popup;
}

function openedPopup() {
  return document.querySelector('.popup_is-opened');
}

function checkModalButton(evt) {
  if (evt.target.classList.contains('popup__close')) {
    return true;
  }
  return false;
}

function checkModalOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    return true;
  }
  return false;
}

function checkModalEsc(evt) {
  if (evt.key === 'Escape') {
    return true;
  }
  return false;
}

export {openModal, closeModal, checkModalButton, checkModalOverlay, checkModalEsc}