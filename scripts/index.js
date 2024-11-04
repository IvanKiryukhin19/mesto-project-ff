// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList=document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(nameValue, sourceValue, descriptionValue) {
  const newCard=templateCard.querySelector('.card').cloneNode(true);
  const cardImage=newCard.querySelector('.card__image');
  const cardTitle=newCard.querySelector('.card__title');
  const buttonBasket=newCard.querySelector('.card__delete-button');

  cardImage.setAttribute('src', sourceValue);
  cardImage.setAttribute('alt', `Это ${descriptionValue} место - ${nameValue}`);
  cardImage.style.display='block';
  cardTitle.textContent=nameValue;

  buttonBasket.addEventListener('click', function(event) {removeCard(event)});

  return placesList.append(newCard);
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
Создал массив для описания картинок (атрибута alt), который через функцию передается в создаваемую карточку.
Тоже рандомно, но в отличие от карточек описание может повторяться.
*/
const randomIndexes=new Array(initialCards.length).fill(0).map((item, index) => index);
randomIndexes.sort(()=>Math.random() - 0.5);

const descriptionPlaces=['красивое','дивное','чудное','прекрасное','удивительное','волшебное'];

function selectDescriptionPlace() {
  return descriptionPlaces[Math.round(Math.random()*(descriptionPlaces.length-1))];
}

for (let i of randomIndexes) {
  createCard(initialCards[i].name, initialCards[i].link, selectDescriptionPlace());
}