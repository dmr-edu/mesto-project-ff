import { submitButtonSelector } from '../selectors';

/**
 * Добавление кнопке признаков загрузки данных. Для возвращения исходного состояния используется замыкание.
 * @param form Форма кнопку которой нужно обработать
 * @param btnSelector Селектор кнопки
 * @param text Текст, который нужно установить на время загрузки
 * @returns Функцию, которая возвращает кнопке исходное состояние
 */
export const startLoading = (form, btnSelector = submitButtonSelector, text = 'Сохранение...') => {
  const btn = form.querySelector(btnSelector);
  const title = btn.textContent;

  btn.setAttribute('disabled', true);
  btn.textContent = text;

  return (text = '') => {
    btn.removeAttribute('disabled');
    btn.textContent = text || title;
  }
}