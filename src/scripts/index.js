import '../pages/index.css';
import {createCard, removeCard, clickIconHeart} from './card.js';
import {openModal, closeModal, closeModalByOverlay} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {loadUser, initialCards, saveProfileToServer, saveNewCardToServer, saveAvatarToServer, deleteCardFromServer, addLikeToServer, removeLikeFromServer} from './api.js';

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
const profileImage=document.querySelector('.profile__image');
const formAvatar=document.forms['edit-avatar'];
const popupAvatar=document.querySelector('.popup_type_avatar');
const popupDeleteCard=document.querySelector('.popup_type_delete');
const formDeleteCard=document.forms['delete-place'];

const validationConfig={
  formList: ".popup__form",
  input: ".popup__input",
  button: ".popup__button",
  inputError: "popup__input-error",
};

Promise.all([loadUser(),initialCards()])
  .then(([infoProfile, infoCards])=>{
    profileTitle.textContent=infoProfile.name;
    profileDescription.textContent=infoProfile.about.replace(/\,/,' -');
    profileImage.style.backgroundImage=`url(${infoProfile.avatar})`;

    infoCards.forEach((card)=>{
      const data={
        name: card.name,
        link: card.link,
        likes: card.likes.length,
        owner: card.owner["_id"]===infoProfile["_id"],
        id: card["_id"],
        isLiked: checkIsLiked(card.likes, infoProfile["_id"]),
      }
      placesList.append(createCard(data, showPopupDeleteCard, handlerLikeHeart, loadAndOpenPopupImage));
    });
    console.log(`Загружено ${infoCards.length} карточек`);
  })
  .catch(err=>console.log(err));

function checkIsLiked(likes, userId){
  return likes.some((like)=>{
    return like["_id"]===userId;
  });
};

enableValidation(validationConfig);

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

profileImage.addEventListener('click', ()=>{
  formAvatar.reset();
  clearValidation(popupAvatar, validationConfig);
  openModal(popupAvatar);
});

function handlerFormAvatarSubmit(evt) {
  evt.preventDefault();
  const urlNewAvatar=popupAvatar.querySelector('#popup__input_avatar_url').value;
  
  savingProcess(evt.submitter, true);
  saveAvatarToServer(urlNewAvatar)
    .then((res)=>{
      profileImage.style.backgroundImage=`url(${urlNewAvatar})`;
      console.log(`${res.name} - изменение аватара прошло успешно`);
      closeModal(popupAvatar);
    })
    .catch(err=>console.log(err))
    .finally(savingProcess(evt.submitter,false))
}

popupAvatar.addEventListener('submit', handlerFormAvatarSubmit);

profileAddButton.addEventListener('click',()=>{
  formNewPlace.reset();
  clearValidation(popupAddCard, validationConfig);
  openModal(popupAddCard);
});

function getDataFromForm(form,fields){
  return fields.map(field => form.elements[field].value);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const [nameInput,jobInput]=getDataFromForm(formEdit,fieldsOfForms.formEditProfile);

  savingProcess(evt.submitter,true);
  saveProfileToServer(nameInput,jobInput)
    .then((res)=>{
      profileTitle.textContent=nameInput;
      profileDescription.textContent=jobInput;
      console.log(`${res.name} - данные профиля успешно изменены`);
      closeModal(popupEditProfile);
    })
    .catch(err=>console.log(err))
    .finally(savingProcess(evt.submitter,false));
};

formEdit.addEventListener('submit',handleFormEditSubmit);

function handleFormPlaceSubmit(evt) {
  evt.preventDefault();
  const [namePlace, linkPlace]=getDataFromForm(formNewPlace, fieldsOfForms.formAddPlace);

  const data={
    name: namePlace,
    link: linkPlace,
    owner: true,
  };

  savingProcess(evt.submitter, true);
  saveNewCardToServer(namePlace, linkPlace)
    .then(res=>{
      data.likes=0;
      data.id=res['_id'];
      placesList.prepend(createCard(data,showPopupDeleteCard,handlerLikeHeart,loadAndOpenPopupImage));
      console.log('Запись прошла успешно');
      closeModal(popupAddCard);
    })
    .catch(err=>console.log(err))
    .finally(savingProcess(evt.submitter, false))
}

formNewPlace.addEventListener('submit',handleFormPlaceSubmit);

function loadAndOpenPopupImage(data) {
  popupImage.querySelector('.popup__image').setAttribute('src', data.link);
  popupImage.querySelector('.popup__image').setAttribute('alt', data.name);
  popupImage.querySelector('.popup__caption').textContent=data.name;

  openModal(popupImage);
};

function savingProcess(button, process){
  if (process){
    button.textContent='Сохранение...';
  }else{
    button.textContent='Сохранить';
  }
}

//Попробую попытку без наставника)) записывая id картинки в атрибут кнопки, подтверждающей удаление карточки.
// Не стал устанавливать атрибут через setAttribute('data-delete-image-id', ''), а добавил пустой в тег, в HTML

function handlerSubmitDeleteCard(evt) {
  evt.preventDefault();
  
  const cardId=evt.submitter.dataset.deleteImageId;
  const deletedCard=placesList.querySelector(`[id="${cardId}"`).parentNode;

  deleteCardFromServer(cardId)
    .then((res)=>{
      console.log(res.message);
      removeCard(deletedCard);
      evt.submitter.dataset.deleteImageId='';
      closeModal(popupDeleteCard);
    })
    .catch(err=>console.log(err));
}

formDeleteCard.addEventListener('submit',handlerSubmitDeleteCard);

function showPopupDeleteCard(cardId){
  openModal(popupDeleteCard);
  const button=popupDeleteCard.querySelector('.button');
  button.dataset.deleteImageId=cardId;
}

function handlerLikeHeart(evt, cardImageId, heartCounter) {
  if (evt.target.classList.contains('card__like-button_is-active')){
    removeLikeFromServer(cardImageId)
      .then((res)=>{
        console.log('Like успешно удален');
        heartCounter.textContent=res.likes.length;
        clickIconHeart(evt);
      })
      .catch(err=>console.log(err))
  }else{
    addLikeToServer(cardImageId)
      .then((res)=>{
        console.log(`Like успешно сохранен`);
        heartCounter.textContent=res.likes.length;
        clickIconHeart(evt);
      })
      .catch(err=>console.log(err))
  }
}