import { putMe, showError, updateAvatar } from "./api";
import { closePopup, openPopup } from "./modal";
import {
  inactiveButtonClass,
  inputErrorClass,
  inputSelector,
  errorClass,
  submitButtonSelector
} from './selectors'
import { startLoading } from "./utils/loading";
import { clearValidation, toggleButtonState } from "./validation";

const editPopupBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const profileImg = document.querySelector('.profile__image');

const avatarForm = document.forms['new-avatar'];
const avatarInput = avatarForm.elements['avatar-link'];

// Форма редактирования профиля
const profileForm = document.forms['edit-profile'];
// Поля формы профиля
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

// Данные профиля (имя, специальность)
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

export const fillProfileData = (data) => {
  const profile = document.querySelector('.profile');
  profile.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
  profile.querySelector('.profile__title').textContent = data.name;
  profile.querySelector('.profile__description').textContent = data.about;;
}

/**
 * Сохранить новые данные из полей формы и закрыть попап
 * @param {*} e Объект события
 */
const handleProfileSubmit = (me) => (e) => {
  const endLoading = startLoading(profileForm);
  e.preventDefault();
  putMe({
    name: nameInput.value,
    about: jobInput.value
  })
    .then((_me) => {
      me = _me;
      profileTitle.textContent = _me.name
      profileDesc.textContent = _me.about
      profileForm.reset();
      closePopup(editPopup);
    })
    .catch(showError)
    .finally(endLoading)
}

const openEditProfile = () => {
  nameInput.value = profileTitle.textContent?.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, '');
  jobInput.value = profileDesc.textContent?.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, '');
  const inputList = Array.from(profileForm.querySelectorAll(inputSelector));
  const buttonElement = profileForm.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass)
  clearValidation(profileForm, {
    inputSelector,
    inputErrorClass,
    errorClass
  })
  openPopup(editPopup)
}

const openEditAvatar = () => {
  const inputList = Array.from(profileForm.querySelectorAll(inputSelector));
  const buttonElement = profileForm.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass)
  clearValidation(profileForm, {
    inputSelector,
    inputErrorClass,
    errorClass
  })
  openPopup(editAvatarPopup)
}

/**
 * Сохранить новое изображение
 * @param {*} e Объект события
 */
const handleAvatarSubmit = (me) => (e) => {
  const endLoading = startLoading(avatarForm);
  e.preventDefault();
  updateAvatar(avatarInput.value)
    .then((_me) => {
      me = _me;
      fillProfileData(me);
      profileForm.reset();
      closePopup(editPopup);
    })
    .catch(showError)
    .finally(endLoading)
}

export const setProfileListeners = (me) => {
  profileImg.addEventListener('click', openEditAvatar);
  avatarForm.addEventListener('submit', handleAvatarSubmit(me))
  // Сохранить изменения профиля
  profileForm.addEventListener('submit', handleProfileSubmit(me));
  editPopupBtn.addEventListener('click', openEditProfile);
}
