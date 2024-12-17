const templateCard = document.querySelector('#card-template').content;
const errorLoadImage = new URL('../images/errorLoadImage.jpg', import.meta.url);

//Функция создания карточки
function createCard(data, onDelete, onLike, onOpenModal) {
  const newCard=templateCard.querySelector('.card').cloneNode(true);
  const cardImage=newCard.querySelector('.card__image');
  const cardTitle=newCard.querySelector('.card__title');
  const buttonBasket=newCard.querySelector('.card__delete-button');
  const buttonIconHeart=newCard.querySelector('.card__like-button');
  const heartCounter=newCard.querySelector('.card__heart-counter');
  
  cardImage.setAttribute('src', data.link);
  cardImage.setAttribute('onerror', `this.src='${errorLoadImage}'`);
  cardImage.setAttribute('alt', `Это место - ${data.name}`);
  cardImage.id=data.id;
  cardTitle.textContent=data.name;
  heartCounter.textContent=data.likes;
  
  if (data.isLiked) buttonIconHeart.classList.add('card__like-button_is-active');

  if (data.owner){
    buttonBasket.addEventListener('click', ()=>onDelete(newCard,data.id));
  }else{
    buttonBasket.setAttribute('hidden', true);
  }
  
  buttonIconHeart.addEventListener('click', (evt)=>onLike(evt, cardImage.id, heartCounter));
  cardImage.addEventListener('click',()=>onOpenModal(data));
  
  return newCard;
};

//Функция удаления карточки
function removeCard(deletedCard, cardImageId) {
  deletedCard.remove();
};

//функция постановки/снятия лайка
function clickIconHeart(evt){
  evt.target.classList.toggle('card__like-button_is-active');
};

export {createCard, removeCard, clickIconHeart}