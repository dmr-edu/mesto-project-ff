import { deleteCard, likeCard, showError, unLikeCard } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

const checkIsLiked = (likes, meId) => likes.some((l) => {
  return l?._id === meId
})

// Функция создания карточки
export const createCard = (data, remove, like, show, me) => {
  let currentData = data
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = currentData.link;
  cardImage.alt = currentData.name;
  cardImage.loading = "lazy"
  updateCardLikes(card, currentData?.likes, me?._id);
  cardImage.addEventListener('click', () => {
    show(currentData)
  })

  card.querySelector('.card__title').textContent = currentData.name;

  if (me?._id === currentData?.owner?._id) {
    const deleteBtn = card.querySelector('.card__delete-button')
    deleteBtn.addEventListener('click', () => { remove(card, currentData?._id) });
    deleteBtn.classList.remove('hidden')
  }
  card.querySelector('.card__like-button').addEventListener('click', () => {
    like(currentData?._id, checkIsLiked(currentData?.likes, me?._id))
      .then((_data) => {
        currentData = _data
        updateCardLikes(card, _data?.likes, me?._id)
      })
      .catch(showError)
  })

  return card
}

export const deleteCallback = (cardElement, cardId) => {
  deleteCard(cardId)
    .then(() => removeCard(cardElement))
    .catch(showError)
}

// Функция удаления карточки
export const removeCard = (card) => card.remove();
// Функция лайка карточки
export const updateCardLikes = (card, likes = [], meId) => {
  card.querySelector('.card__like-count').textContent = likes.length;
  const isLiked = checkIsLiked(likes, meId)
  const likeBtn = card?.querySelector('.card__like-button');
  likeBtn.classList.toggle('card__like-button_is-active', isLiked);
}

export const toggleCardLike = (id, isLiked = false) => {
  return isLiked ? unLikeCard(id) : likeCard(id)
}
