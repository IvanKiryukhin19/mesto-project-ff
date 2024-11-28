import '../pages/index.css';
import {createCard, removeCard, clickIconHeart} from './card.js';
import {initialCards} from './cards.js';
import {openModal, closeModal, checkModalButton, checkModalOverlay, checkModalEsc} from './modal.js';

const placesList=document.querySelector('.places__list');

const profileAddButton=document.querySelector('.profile__add-button');
const profileEditButton=document.querySelector('.profile__edit-button');
const popupAddCard=document.querySelector('.popup_type_new-card');
const popupEditProfile=document.querySelector('.popup_type_edit');
const profileTitle=document.querySelector('.profile__title');
const profileDescription=document.querySelector('.profile__description');
const formEdit=document.forms['edit-profile'];
const formNewPlace=document.forms['new-place'];

/*в задании этого не было, но думаю мои добавки его не нарушают.
Создал массив равный количеству карточек, заполнил индексами и отсортировал его рандомно, что бы по индексу выводить корточки
в случайном порядке при загрузке/перезагрузке.
*/
const randomIndexes=new Array(initialCards.length).fill(0).map((item, index) => index);
randomIndexes.sort(()=>Math.random() - 0.5);

for (let i of randomIndexes){
  const data={
    name: initialCards[i].name,
    link: initialCards[i].link,
    onDelete: removeCard,
    onLike: clickIconHeart,
    onOpenModal: handlerOpenPopup,
  };
  placesList.append(createCard(data));
}

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

function handlerOpenPopup(popup){
  openModal(popup);
  const closeButton=popup.querySelector('.popup__close');
  closeButton.addEventListener('click', handlerCloseModal);
  document.addEventListener('keydown', handlerCloseModal);
  popup.addEventListener('click', handlerCloseModal);
}

function resetForm(popup){
  if (popup.querySelector('.popup__form')){
    popup.querySelector('.popup__form').reset();
  }
}

function handlerCloseModal(evt) {
  evt.stopPropagation();
  if (checkModalButton(evt) || checkModalEsc(evt) || checkModalOverlay(evt)){
    const popup=closeModal();
    document.removeEventListener('keydown',handlerCloseModal);
    resetForm(popup);
  }
};

profileEditButton.addEventListener('click', ()=>{
  const data={
    form: formEdit,
    fieldName: 'name',
    fieldDescription: 'description',
    name: profileTitle.textContent,
    description: profileDescription.textContent,
  };
  loadDataToForm(data);
  handlerOpenPopup(popupEditProfile);
});
profileAddButton.addEventListener('click',()=>handlerOpenPopup(popupAddCard));

function getDataFromForm(form,fields){
  return [form.elements[fields[0]].value,form.elements[fields[1]].value];
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const [nameInput,jobInput]=getDataFromForm(formEdit,fieldsOfForms.formEditProfile);
  
  profileTitle.textContent=nameInput;
  profileDescription.textContent=jobInput;
  closeModal(popupEditProfile);
  document.removeEventListener('keydown',handlerCloseModal);
};

formEdit.addEventListener('submit',handleFormEditSubmit);

function handleFormPlaceSubmit(evt) {
  evt.preventDefault();
  const [namePlace, linkPlace]=getDataFromForm(formNewPlace, fieldsOfForms.formAddPlace);
  
  const data={
    name: namePlace,
    link: linkPlace,
    onDelete: removeCard,
    onLike: clickIconHeart,
    onOpenModal: handlerOpenPopup,
  };

  placesList.prepend(createCard(data));
  closeModal(popupAddCard);
  document.removeEventListener('keydown',handlerCloseModal);
  formNewPlace.reset();
}

formNewPlace.addEventListener('submit',handleFormPlaceSubmit);

