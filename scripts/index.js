// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList=document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(nameValue, sourceValue, removedCard) {
  const newCard=templateCard.querySelector('.card').cloneNode(true);
  const cardImage=newCard.querySelector('.card__image');
  const cardTitle=newCard.querySelector('.card__title');
  const buttonBasket=newCard.querySelector('.card__delete-button');

  cardImage.setAttribute('src', sourceValue);
  cardImage.setAttribute('alt', `Это место - ${nameValue}`);
  //cardImage.style.display='block';
  cardTitle.textContent=nameValue;

  buttonBasket.addEventListener('click', removedCard);

  return newCard;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  const deletedCard=evt.target.parentElement;
  deletedCard.remove();
}

// @todo: Вывести карточки на страницу
/*в задании этого не было, но думаю мои добавки его не нарушают.
Создал массив равный количеству карточек, заполнил индексами и отсортировал его рандомно, что бы по индексу выводить корточки
в случайном порядке при загрузке/перезагрузке.
*/

const randomIndexes=new Array(initialCards.length).fill(0).map((item, index) => index);
randomIndexes.sort(()=>Math.random() - 0.5);

for (let i of randomIndexes) {
  placesList.append(createCard(initialCards[i].name, initialCards[i].link, removeCard));
}