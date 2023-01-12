function removeDOMElement(elem) {
  elem.remove();
}

function removeHash() {
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  );
}

function disableButton(button) {
  button.setAttribute('disabled', '');
}

function enableButton(button) {
  button.removeAttribute('disabled', '');
}

function submitForm(form) {
  form.submit();
  form.reset();
}

function showValidationError(targetField, message) {
  targetField.classList.add('_error-validate');
  targetField.nextElementSibling.textContent = message;
}

function removeValidationError(targetField) {
  targetField.classList.remove('_error-validate');
  targetField.nextElementSibling.textContent = '';
}

function removeErrorEmptyField(field, button) {
  if (field.value === '' && field.classList.contains('_error-validate')) {
    removeValidationError(field);

    if (button.hasAttribute('disabled')) enableButton(button);
  }
}

export {
  removeDOMElement,
  removeHash,
  enableButton,
  disableButton,
  submitForm,
  showValidationError,
  removeValidationError,
  removeErrorEmptyField,
};
