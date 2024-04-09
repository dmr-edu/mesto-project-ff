// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
const makeCard = (data, remove) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__image').alt = data.name;

  card.querySelector('.card__title').textContent = data.name;

  card.querySelector('.card__delete-button').addEventListener('click', remove);

  return card
}

// Функция удаления карточки
const removeCard = (e) => e.target.closest('.card').remove();

// DOM узлы
const cards = initialCards.map((c) => makeCard(c, removeCard));

// Вывести карточки на страницу
document.querySelector('.places__list').append(...cards)