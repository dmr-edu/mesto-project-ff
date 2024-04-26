const setEventListeners = (formElement, {
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity({ formElement, inputElement, inputErrorClass, errorClass });
      toggleButtonState(inputList, buttonElement, inactiveButtonClass)
    });
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveClass);
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(inactiveClass);
    buttonElement.removeAttribute('disabled')
  }
}

function enableValidation(params) {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const selectors = { ...params };
    delete selectors.formSelector;
    setEventListeners(formElement, selectors);
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const showInputError = ({ formElement, inputElement, errorMessage, inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = ({ formElement, inputElement, inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
}) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMsg);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError({ formElement, inputElement, errorMessage: inputElement.validationMessage, inputErrorClass, errorClass });
  } else {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
  }
};

function clearValidation(
  formElement, {
    inputSelector,
    inputErrorClass,
    errorClass,
    submitButtonSelector,
    inactiveButtonClass
  }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass })
  });
  if (submitButtonSelector && inactiveButtonClass) {
    const submitBtn = formElement.querySelector(submitButtonSelector)
    toggleButtonState(inputList, submitBtn, inactiveButtonClass)
  }
}

export {
  toggleButtonState,
  clearValidation,
  enableValidation
}