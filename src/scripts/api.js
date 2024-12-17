const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: '778c90df-9b17-47a9-93ec-1dcdc309f270',
    'Content-Type': 'application/json'
  }
}

function returnResolveOrReject(res){
  if (res.ok) {
    return res.json();
  }else{
    return Promise.reject(`Ошибка, статус запроса: ${res.status}`);
  }
}

function loadUser(){
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(res=>returnResolveOrReject(res))
}

function initialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(res=>returnResolveOrReject(res))
}

function saveProfileToServer(name, job) {
return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    })
  })
    .then(res=>returnResolveOrReject(res))
}

function saveNewCardToServer(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
    .then(res=>returnResolveOrReject(res))
}

function deleteCardFromServer(cardImageId) {
  return fetch(`${config.baseUrl}/cards/${cardImageId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res=>returnResolveOrReject(res))
}

function addLikeToServer(cardImageId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardImageId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res=>returnResolveOrReject(res))
}

function removeLikeFromServer(cardImageId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardImageId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res=>returnResolveOrReject(res))
}

function saveAvatarToServer(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    })
  })
    .then(res=>returnResolveOrReject(res))
}

export {loadUser, initialCards, saveProfileToServer, saveNewCardToServer, deleteCardFromServer, addLikeToServer, removeLikeFromServer, saveAvatarToServer}