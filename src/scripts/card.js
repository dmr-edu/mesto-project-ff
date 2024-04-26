import { addCard, deleteCard, likeCard, showError, unLikeCard } from "./api";
import { closePopup, openPopup } from "./modal";
import {
  inputErrorClass,
  inputSelector,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass
} from './selectors'
import { startLoading } from "./utils/loading";
import { clearValidation } from "./validation";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const addCardBtn = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');

// Форма добавления карточки
const cardForm = document.forms['new-place'];
// Поля формы карточки
const placeNameInput = cardForm.elements['place-name'];
const placeLinkInput = cardForm.elements['link'];

const checkIsLiked = (likes, meId) => likes.some((l) => {
  return l?._id === meId
})

// Функция создания карточки
export const createCard = (data, remove, like, show, me) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardImage.loading = "lazy"
  updateCardLikes(card, data?.likes, me?._id);
  cardImage.addEventListener('click', () => {
    show(data)
  })

  card.querySelector('.card__title').textContent = data.name;

  if (me?._id === data?.owner?._id) {
    const deleteBtn = card.querySelector('.card__delete-button')
    deleteBtn.addEventListener('click', () => {
      deleteCard(data?._id)
        .then(() => remove(card))
        .catch(showError)
    });
    deleteBtn.classList.remove('hidden')
  }
  card.querySelector('.card__like-button').addEventListener('click', () => {
    like(data?._id, checkIsLiked(data?.likes, me?._id))
      .then((_data) => {
        data = _data
        updateCardLikes(card, data?.likes, me?._id)
      })
      .catch(showError)
  })

  return card
}

// Функция удаления карточки
export const removeCard = (card) => card.remove();
// Функция лайка карточки
export const updateCardLikes = (card, likes = [], meId) => {
  card.querySelector('.card__like-count').textContent = likes.length;
  const isLiked = checkIsLiked(likes, meId)
  const likeBtn = card?.querySelector('.card__like-button');
  if (isLiked) {
    likeBtn.classList.add('card__like-button_is-active');
  } else {
    likeBtn.classList.remove('card__like-button_is-active');
  }
}

export const toggleCardLike = (id, isLiked = false) => {
  return isLiked ? unLikeCard(id) : likeCard(id)
}

// Показать картинку в попапе
const showImage = (data) => {
  const popupImage = imagePopup.querySelector('.popup__image');
  popupImage.src = data.link;
  popupImage.alt = data.name;
  imagePopup.querySelector('.popup__caption').textContent = data.name;
  openPopup(imagePopup)
}

// Список карточек
const placesList = document.querySelector('.places__list');

export const createAndAddCards = (list, me) => {
  // DOM узлы
  const cards = list.map((c) => createCard(c, removeCard, toggleCardLike, showImage, me));
  // Вывести карточки на страницу
  placesList.append(...cards);
}

const openNewCard = () => {
  const inputList = Array.from(newCardPopup.querySelectorAll(inputSelector));
  // Очистить сообщения об ошибках валидации если пользователь начинал вводить данные, а потом очистил поле и закрыл форму
  if (inputList.every((input) => !input.value)) {
    clearValidation(newCardPopup, {
      inputSelector,
      inputErrorClass,
      errorClass
    })
  }
  openPopup(newCardPopup)
}

const addNewCardSubmit = (me) => (e) => {
  const endLoading = startLoading(cardForm);
  e.preventDefault();
  addCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  })
    .then((data) => {
      const card = createCard(data, removeCard, toggleCardLike, showImage, me);
      placesList.prepend(card);
      cardForm.reset();
      clearValidation(cardForm, {
        inputSelector,
        inputErrorClass,
        errorClass,
        submitButtonSelector,
        inactiveButtonClass
      })
      closePopup(newCardPopup);
    })
    .catch(showError)
    .finally(endLoading)
}

export const setCardsListener = (me) => {
  addCardBtn.addEventListener('click', openNewCard);
  // Добавить новую карточку
  cardForm.addEventListener('submit', addNewCardSubmit(me));
}
