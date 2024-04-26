import { deleteCallback, toggleCardLike, createCard } from './card';
import { addCard, showError } from "./api";
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

const addCardBtn = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');

// Форма добавления карточки
const cardForm = document.forms['new-place'];
// Поля формы карточки
const placeNameInput = cardForm.elements['place-name'];
const placeLinkInput = cardForm.elements['link'];
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
  const cards = list.map((c) => createCard(c, deleteCallback, toggleCardLike, showImage, me));
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

const handleNewCardSubmit = (me) => (e) => {
  const endLoading = startLoading(cardForm);
  e.preventDefault();
  addCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  })
    .then((data) => {
      const card = createCard(data, deleteCallback, toggleCardLike, showImage, me);
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
  cardForm.addEventListener('submit', handleNewCardSubmit(me));
}
