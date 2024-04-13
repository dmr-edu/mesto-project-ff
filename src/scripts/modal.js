export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened')
}

const closePopupByEsc = (e) => {
  if (e.key !== 'Escape') return;
  closePopup(document.querySelector('.popup_is-opened'));
  document.removeEventListener('keydown', closePopupByEsc)
}

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', closePopupByEsc)
}

/**
 * Закрывает попап при клике не посрезственно по самому элементу .popup
 * @param {*} e Объект события
 * @returns void
 */
export const closePopupByBackdrop = (e) => {
  if (!e.target.classList.contains('popup')) return;
  closePopup(e.target);
}

/**
 * Закрыть попап в котором находиться кнопка "х"
 * @param {*} e Объект события
 */
export const closeClosestPopup = (e) => {
  closePopup(e.target.closest('.popup'))
}