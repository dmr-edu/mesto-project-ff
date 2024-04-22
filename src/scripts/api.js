const BASE_API_URL = 'https://nomoreparties.co/v1/cohort-magistr-2';
const AUTH_TOKEN = 'add11dd4-8d1d-44bb-8c89-49bfd288fc92';
const headers = {
  authorization: AUTH_TOKEN,
  'Content-Type': 'application/json'
}

export const showError = (msg) => alert(`Ошибка: ${msg}`)

const _fetch = async (url, params) =>
  fetch(`${BASE_API_URL}${url}`, {
    headers,
    ...params
  })
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))

export const getMe = () => {
  return _fetch('/users/me')
}

export const putMe = (body = {}) => {
  return _fetch('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(body)
  })
}

export const getCards = () => {
  return _fetch('/cards')
}

export const addCard = (body = {}) => {
  return _fetch('/cards', {
    method: 'POST',
    body: JSON.stringify(body)
  })
}

export const deleteCard = (id) => {
  return _fetch(`/cards/${id}`, {
    method: 'DELETE'
  })
}

export const likeCard = (id) => {
  return _fetch(`/cards/likes/${id}`, {
    method: 'PUT'
  })
}

export const unLikeCard = (id) => {
  return _fetch(`/cards/likes/${id}`, {
    method: 'DELETE'
  })
}

export const updateAvatar = (avatar) => {
  return _fetch('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatar })
  })
}

