// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export const createCard = (data, remove, like, show) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardImage.addEventListener('click', () => {
    show(data)
  })

  card.querySelector('.card__title').textContent = data.name;

  card.querySelector('.card__delete-button').addEventListener('click', remove);
  card.querySelector('.card__like-button').addEventListener('click', like)

  return card
}

// Функция удаления карточки
export const removeCard = (e) => e.target.closest('.card').remove();
// Функция лайка карточки
export const likeCard = (e) => e.target.classList.toggle('card__like-button_is-active');