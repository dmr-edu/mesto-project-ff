export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened')
}

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')

  const close = (e) => {
    if (e.key !== 'Escape') return;
    closePopup(popup);
    document.removeEventListener('keydown', close)
  }

  document.addEventListener('keydown', close)
}