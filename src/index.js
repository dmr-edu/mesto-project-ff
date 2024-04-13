import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openPopup, closePopup, closePopupByBackdrop, closeClosestPopup } from './scripts/modal';
import { createCard, likeCard, removeCard } from './scripts/card';

// Показать картинку в попапе
const showImage = (data) => {
  const popupImage = imagePopup.querySelector('.popup__image');
  popupImage.src = data.link;
  popupImage.alt = data.name;
  imagePopup.querySelector('.popup__caption').textContent = data.name;
  openPopup(imagePopup)
}

// DOM узлы
const cards = initialCards.map((c) => createCard(c, removeCard, likeCard, showImage));

// Список карточек
const placesList = document.querySelector('.places__list');
// Вывести карточки на страницу
placesList.append(...cards);

const editPopupBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const addCardBtn = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');

// Форма редактирования профиля
const profileForm = document.forms['edit-profile'];
// Поля формы профиля
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

// Форма добавления карточки
const cardForm = document.forms['new-place'];
// Поля формы карточки
const placeNameInput = cardForm.elements['place-name'];
const placeLinkInput = cardForm.elements['link'];

// Данные профиля (имя, специальность)
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

// Кнопки закрытия попапов
const closePopupBtns = document.querySelectorAll('.popup__close');
// Попапы
const popups = document.querySelectorAll('.popup');

const openEditProfile = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  openPopup(editPopup)
}

/**
 * Сохранить новые данные из полей формы и закрыть попап
 * @param {*} e Объект события
 */
const handleFormSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value
  profileDesc.textContent = jobInput.value
  profileForm.reset();
  closePopup(editPopup);
}

const addNewCardSubmit = (e) => {
  e.preventDefault();
  const card = createCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  }, removeCard, likeCard, showImage);
  placesList.prepend(card);
  cardForm.reset();
  closePopup(newCardPopup);
}

editPopupBtn.addEventListener('click', openEditProfile);
addCardBtn.addEventListener('click', () => openPopup(newCardPopup));

// Закрыть попап по кнопке "х"
closePopupBtns.forEach((btn) => btn.addEventListener('click', closeClosestPopup));

// Закрыть попап по клику по фону
popups.forEach((btn) => btn.addEventListener('click', closePopupByBackdrop));

// Сохранить изменения профиля
profileForm.addEventListener('submit', handleFormSubmit);

// Добавить новую карточку
cardForm.addEventListener('submit', addNewCardSubmit); 
