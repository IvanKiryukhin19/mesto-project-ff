const templateCard = document.querySelector('#card-template').content;

//Функция создания карточки
function createCard(data, onDelete, onLike, onOpenModal) {
  const newCard=templateCard.querySelector('.card').cloneNode(true);
  const cardImage=newCard.querySelector('.card__image');
  const cardTitle=newCard.querySelector('.card__title');
  const buttonBasket=newCard.querySelector('.card__delete-button');
  const buttonIconHeart=newCard.querySelector('.card__like-button');

  cardImage.setAttribute('src', data.link);
  cardImage.setAttribute('alt', `Это место - ${data.name}`);
  cardTitle.textContent=data.name;

  buttonBasket.addEventListener('click', ()=>onDelete(newCard));
  buttonIconHeart.addEventListener('click', onLike);
  cardImage.addEventListener('click',()=>onOpenModal(data));
  
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