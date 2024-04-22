import './pages/index.css';
import { closePopupByBackdrop, closeClosestPopup } from './scripts/modal';
import { createAndAddCards, setCardsListener } from './scripts/card';
import { enableValidation } from './scripts/validation';
import { getCards, getMe, showError } from './scripts/api';
import { fillProfileData, setProfileListeners } from './scripts/profile';
import {
  formSelector,
  inactiveButtonClass,
  inputErrorClass,
  inputSelector,
  errorClass,
  submitButtonSelector
} from './scripts/selectors'

let me = {};

async function getData() {
  Promise.all([
    getMe(),
    getCards()
  ])
    .then(([_me, cards]) => {
      me = _me
      fillProfileData(me);
      createAndAddCards(cards, me)
    })
    .catch(showError)
}

getData();

// Кнопки закрытия попапов
const closePopupBtns = document.querySelectorAll('.popup__close');
// Попапы
const popups = document.querySelectorAll('.popup');

// Закрыть попап по кнопке "х"
closePopupBtns.forEach((btn) => btn.addEventListener('click', closeClosestPopup));

// Закрыть попап по клику по фону
popups.forEach((btn) => btn.addEventListener('click', closePopupByBackdrop));

// Добавить модальным окнам класс "popup_is-animated"
// чтобы избежать первоначальный переход прозрачности при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  popups.forEach((p) => p.classList.add('popup_is-animated'))
})

enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
});

setProfileListeners(me);
setCardsListener(me)
