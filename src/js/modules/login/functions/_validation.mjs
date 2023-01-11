import $ from 'jquery';
import {
  removeHash,
  enableButton,
  disableButton,
} from '../../functions/_custom-funcs.mjs';

// Form variables
const loginForm = document.querySelector('.area-login__form');
const requiredLoginFields = loginForm.querySelectorAll('[required]');
const continueWithEmailButton = document.querySelector('.form__email-continue');

// User data variables
const userEmailField = document.querySelector('.email__field');
const errorValidateFields = document.querySelectorAll(
  '.area-login__form_error'
);

// Error messages
const userIsExistedError = 'Sorry, this user is already registered!';
const emptyRequiredFieldError = 'Please, fill in the required field!';
const invalidEmailError = 'Please enter a valid e-mail';

// Validation functions
function validateEmail(email) {
  const regExpEmail =
    /^[A-Z0-9\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df._%+-]{2,}@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  return regExpEmail.test(String(email));
}

function showValidationError(targetField, message) {
  targetField.classList.add('_error-validate');
  targetField.nextElementSibling.textContent = message;
}

function removeValidationError(targetField) {
  targetField.classList.remove('_error-validate');
  targetField.nextElementSibling.textContent = '';
}

function restrictDuplicateUsername(userEmailValue) {
  $.ajax({
    url: './assets/php/login/restrict-duplicates.php',
    method: 'post',
    data: { userEmailValue },
    success: (response) => {
      const responseFromServer = JSON.parse(response);
      if (responseFromServer.status === 'success') {
        showValidationError(userEmailField, userIsExistedError);
        disableButton(continueWithEmailButton);
      }

      if (
        responseFromServer.status === 'error' &&
        userEmailField.classList.contains('_error-validate') &&
        continueWithEmailButton.hasAttribute('disabled')
      ) {
        removeValidationError(userEmailField);
        enableButton(continueWithEmailButton);
      }
    },
  });
}

function submitForm(form) {
  form.submit();
  form.reset();
}

// Form Validation Function (main function)
function validateEnterForm() {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userEmailVal = userEmailField.value;

    const emptyLoginFields = Array.from(requiredLoginFields).filter(
      (input) => input.value === ''
    );

    requiredLoginFields.forEach((field) => {
      if (field.value === '')
        showValidationError(field, emptyRequiredFieldError);
      else removeValidationError(field);
    });

    if (!userEmailField.classList.contains('_error-validate'))
      if (!validateEmail(userEmailVal))
        showValidationError(userEmailField, invalidEmailError);
      else removeValidationError(userEmailField);

    if (window.location.hash === '#registration') {
      if (validateEmail(userEmailVal) && userEmailVal !== '') {
        errorValidateFields.forEach((element) => element.remove());
        removeHash();
        alert('Form is successfully submitted! Please wait for a while!'); // eslint-disable-line no-alert
        submitForm(loginForm);
      }
    }

    if (window.location.hash !== '#registration') {
      if (emptyLoginFields.length === 0 && validateEmail(userEmailVal)) {
        errorValidateFields.forEach((element) => element.remove());
        alert('Please wait...'); // eslint-disable-line no-alert
        submitForm(loginForm);
      }
    }
  });
}
// Form Validation

export { validateEnterForm, restrictDuplicateUsername, removeValidationError };

/*  
    !!! REFACTORRED CODE

    requiredLoginFields.forEach((field) => {
      if (field.value === '') {
        showValidationError(field, emptyRequiredFieldError);
        field.classList.add('_error-validate');
        field.nextElementSibling.textContent =
          'Please, fill in the required field!';
      } else {
        field.classList.remove('_error-validate');
        field.nextElementSibling.textContent = '';
      }
    });


        if (!userEmailField.classList.contains('_error-validate'))
      if (!validateEmail(userEmailVal)) {
        userEmailField.classList.add('_error-validate');
        userEmailField.nextElementSibling.textContent =
          'Please enter a valid e-mail';
      } else {
        userEmailField.classList.remove('_error-validate');
        userEmailField.nextElementSibling.textContent = '';
      }
*/
