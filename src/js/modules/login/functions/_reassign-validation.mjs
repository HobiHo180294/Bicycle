import $ from 'jquery';
import {
  submitForm,
  showValidationError,
  removeValidationError,
} from '../../functions/_custom-funcs.mjs';

// Form vars
const reassignForm = document.querySelector('.form-confirmation');
const requiredPassFields = reassignForm.querySelectorAll('[required]');
const newPassField = document.getElementById('new-pass');
const confirmNewPassField = document.getElementById('confirm-pass');

// Password data variables
const errorFormFields = document.querySelectorAll('.form-field__error');
const defaultPassField = document.getElementById('default-pass');

// Errors
const emptyRequiredFieldError = 'Please, fill in the required field!';
const invalidPassError =
  'Password should contain at least one capital, lowercase letter and digit';
const invalidPassLengthError = 'Password should contain at least 9 characters';
const invalidDefaultPassError =
  'We cannot find user with this password. Please try again...';
const matchPassError = 'Passwords do not match';
const equalPassError = 'Passwords cannot be equal';

// Validation functions
function validateUserPass(password) {
  const regExpPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,}$/;
  return regExpPass.test(String(password));
}

function areAllPassFieldsValid(passFields) {
  return [...passFields].every((field) => validateUserPass(field.value));
}

function haveAllPassFieldsValidErrorValidateClass(passFields) {
  return [...passFields].every((field) =>
    field.classList.contains('_error-validate')
  );
}

function arePasswordsMatched(field1, field2) {
  return field1.value === field2.value;
}

function throwDefaultPassNotExistsError(defaultPassValue) {
  let serverResponseCopy = '';
  $.ajax({
    url: './assets/php/login/check-default-password.php',
    method: 'post',
    async: false,
    data: { defaultPassValue },
    success: (response) => {
      const responseFromServer = JSON.parse(response);
      serverResponseCopy = { ...responseFromServer };
      if (responseFromServer.status === 'error')
        showValidationError(defaultPassField, invalidDefaultPassError);

      if (
        responseFromServer.status === 'success' &&
        defaultPassField.classList.contains('_error-validate')
      )
        removeValidationError(defaultPassField);
    },
  });
  return serverResponseCopy;
}

function validateReassignForm() {
  reassignForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emptyPassFields = Array.from(requiredPassFields).filter(
      (input) => input.value === ''
    );

    requiredPassFields.forEach((field) => {
      const fieldValue = field.value;

      if (fieldValue === '')
        showValidationError(field, emptyRequiredFieldError);

      if (fieldValue !== '' && field.value.length < 9)
        showValidationError(field, invalidPassLengthError);

      if (
        fieldValue !== '' &&
        fieldValue.length >= 9 &&
        !validateUserPass(fieldValue)
      )
        showValidationError(field, invalidPassError);

      if (
        fieldValue !== '' &&
        fieldValue.length >= 9 &&
        validateUserPass(fieldValue) &&
        field.classList.contains('_error-validate')
      )
        removeValidationError(field);
    });

    if (arePasswordsMatched(defaultPassField, newPassField))
      showValidationError(newPassField, equalPassError);

    if (!arePasswordsMatched(newPassField, confirmNewPassField))
      showValidationError(confirmNewPassField, matchPassError);

    // WORKS

    if (
      emptyPassFields.length === 0 &&
      areAllPassFieldsValid(requiredPassFields) &&
      !arePasswordsMatched(defaultPassField, newPassField) &&
      !haveAllPassFieldsValidErrorValidateClass(requiredPassFields) &&
      arePasswordsMatched(newPassField, confirmNewPassField)
    ) {
      errorFormFields.forEach((element) => element.remove());
      alert('Your data is proceessing. Please wait for a while!'); // eslint-disable-line no-alert
      submitForm(reassignForm);
    }
  });
}

export { validateReassignForm, throwDefaultPassNotExistsError };

/*
  !!! REFACTORRED CODE
    const defaultPassField = document.getElementById('default-pass');
    const userDefaultPassValue = defaultPassField.value;

      if (!defaultPassField.classList.contains('_error-validate'))
      if (userDefaultPassValue.length < 9)
        showValidationError(defaultPassField, invalidPassLengthError);
      else removeValidationError(defaultPassField);

    if (!defaultPassField.classList.contains('_error-validate'))
      if (!validateUserPass(userDefaultPassValue))
        showValidationError(defaultPassField, invalidPassError);
      else removeValidationError(defaultPassField);

*/
