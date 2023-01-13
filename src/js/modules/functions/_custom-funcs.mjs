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

function validateEmail(email) {
  const regExpEmail = /^[A-Z0-9._%+-]{2,}@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  return regExpEmail.test(String(email));
}

function validateUserPass(password) {
  const regExpPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,}$/;
  return regExpPass.test(String(password));
}

function validateUserNameOrSurname(input) {
  const regExp =
    /^[a-zA-Z\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df -]{2,30}$/i;
  return regExp.test(String(input));
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
  validateUserPass,
  validateEmail,
  validateUserNameOrSurname,
};
