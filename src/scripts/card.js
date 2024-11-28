const templateCard = document.querySelector('#card-template').content;
const popupImage=document.querySelector('.popup_type_image');

//Функция создания карточки
function createCard(data) {
  const newCard=templateCard.querySelector('.card').cloneNode(true);
  const cardImage=newCard.querySelector('.card__image');
  const cardTitle=newCard.querySelector('.card__title');
  const buttonBasket=newCard.querySelector('.card__delete-button');
  const buttonIconHeart=newCard.querySelector('.card__like-button');

  cardImage.setAttribute('src', data.link);
  cardImage.setAttribute('alt', `Это место - ${data.name}`);
  cardTitle.textContent=data.name;

  buttonBasket.addEventListener('click', ()=>data.onDelete(newCard));
  buttonIconHeart.addEventListener('click', data.onLike);
  cardImage.addEventListener('click',()=>{
    data.onOpenModal(popupImage);
    popupImage.querySelector('.popup__image').setAttribute('src', data.link);
    popupImage.querySelector('.popup__image').setAttribute('alt', data.name);
    popupImage.querySelector('.popup__caption').textContent=data.name;
  });

  return newCard;
};

//Функция удаления карточки
function removeCard(deletedCard) {
  deletedCard.remove();
};

//функция постановки/снятия лайка
function clickIconHeart(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export {createCard, removeCard, clickIconHeart}








