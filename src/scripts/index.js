import '../pages/index.css';
import {createCard, removeCard, clickIconHeart} from './card.js';
import {initialCards} from './cards.js';
import {openModal, closeModal, closeModalByOverlay} from './modal.js';

const placesList=document.querySelector('.places__list');

const profileAddButton=document.querySelector('.profile__add-button');
const profileEditButton=document.querySelector('.profile__edit-button');
const popupAddCard=document.querySelector('.popup_type_new-card');
const popupEditProfile=document.querySelector('.popup_type_edit');
const popupImage=document.querySelector('.popup_type_image');
const profileTitle=document.querySelector('.profile__title');
const profileDescription=document.querySelector('.profile__description');
const formEdit=document.forms['edit-profile'];
const formNewPlace=document.forms['new-place'];

/*
const randomIndexes = initialCards.map((item, index) => index).sort(()=>Math.random() - 0.5);
Большое спасибо, за подсказку. Отличный способ - просто и лаконично. Но я воспользуюсь советом и перепишу на "вывод карточек по порядку", если уж все равно надо будет.
*/

for (let card of initialCards){
  const data={
    name: card.name,
    link: card.link,
  }
  placesList.append(createCard(data, removeCard, clickIconHeart, loadAndOpenPopupImage));
}

document.querySelectorAll('.popup').forEach(popup=>{
  popup.addEventListener('click', closeModalByOverlay);
});

const fieldsOfForms={
  formEditProfile: [
    'name',
    'description'
  ],
  formAddPlace: [
    'place-name',
    'link'
  ],
};

function loadDataToForm(data){
  const form=data.form;
  form.elements[data.fieldName].value=data.name;
  form.elements[data.fieldDescription].value=data.description;
}

profileEditButton.addEventListener('click', ()=>{
  const data={
    form: formEdit,
    fieldName: 'name',
    fieldDescription: 'description',
    name: profileTitle.textContent,
    description: profileDescription.textContent,
  };
  loadDataToForm(data);
  openModal(popupEditProfile);
});

profileAddButton.addEventListener('click',()=>{
  formNewPlace.reset();
  openModal(popupAddCard);
});

function getDataFromForm(form,fields){
  return fields.map(field => form.elements[field].value);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const [nameInput,jobInput]=getDataFromForm(formEdit,fieldsOfForms.formEditProfile);

  profileTitle.textContent=nameInput;
  profileDescription.textContent=jobInput;
  closeModal(popupEditProfile);
};

formEdit.addEventListener('submit',handleFormEditSubmit);

function handleFormPlaceSubmit(evt) {
  evt.preventDefault();
  const [namePlace, linkPlace]=getDataFromForm(formNewPlace, fieldsOfForms.formAddPlace);

  const data={
    name: namePlace,
    link: linkPlace,
  };

  placesList.prepend(createCard(data,removeCard,clickIconHeart,loadAndOpenPopupImage));
  closeModal(popupAddCard);
}

formNewPlace.addEventListener('submit',handleFormPlaceSubmit);

function loadAndOpenPopupImage(data) {
  popupImage.querySelector('.popup__image').setAttribute('src', data.link);
  popupImage.querySelector('.popup__image').setAttribute('alt', data.name);
  popupImage.querySelector('.popup__caption').textContent=data.name;

  openModal(popupImage);
};