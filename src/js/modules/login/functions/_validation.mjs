import $ from 'jquery';
import {
  removeHash,
  enableButton,
  disableButton,
  submitForm,
  showValidationError,
  removeValidationError,
  validateEmail,
  validateUserPass,
  validateUserNameOrSurname,
  removeErrorEmptyField,
} from '../../functions/_custom-funcs.mjs';

// Form variables
const loginForm = document.querySelector('.area-login__form');
const continueWithEmailButton = document.querySelector('.form__email-continue');

// User data variables
const userEmailField = document.querySelector('.email__field');
const userPassField = document.querySelector('.password__field');

const userFieldsCollection = document.querySelectorAll('._user-info__field');
const errorValidateFields = document.querySelectorAll(
  '.area-login__form_error'
);

// Error messages
const userIsExistedError = 'Sorry, this user is already registered!';
const emptyRequiredFieldError = 'Please, fill in the required field!';
const invalidEmailError = 'Please enter a valid e-mail';
const invalidPassError =
  'Password should contain at least one capital, lowercase letter and digit';
const invalidPassLengthError = 'Password should contain at least 9 characters';
const invalidNameOrSurnameError = 'Please provide real data!';

// Validation functions

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

function sendScreenResolutionToServer(screenWidth, screenHeight, userEmailVal) {
  $.ajax({
    url: './assets/php/login/screen-resolution.php',
    method: 'post',
    async: false,
    data: { screenWidth, screenHeight, userEmailVal },
    success: (response) => {
      if (response) console.log(response);
    },
  });
}

// Form Validation Function (main function)
function validateEnterForm() {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const requiredLoginFields = loginForm.querySelectorAll('[required]');
    const userInfoFieldsCollection =
      document.querySelectorAll('._user-info__field');

    const userEmailVal = userEmailField.value;
    const userPassVal = userPassField.value;

    // ! COMMON
    const emptyLoginFields = Array.from(requiredLoginFields).filter(
      (input) => input.value === ''
    );

    userInfoFieldsCollection.forEach((field) => {
      field.addEventListener('focus', () =>
        removeErrorEmptyField(field, continueWithEmailButton)
      );
    });

    requiredLoginFields.forEach((field) => {
      if (field.value === '')
        showValidationError(field, emptyRequiredFieldError);
      else removeValidationError(field);
    });

    // ! COMMON

    if (window.location.hash === '#registration') {
      const realNameField = document.getElementById('realName');
      const userSurnameField = document.getElementById('userSurname');

      const userFullnameParts = [realNameField, userSurnameField];

      if (!userEmailField.classList.contains('_error-validate'))
        if (!validateEmail(userEmailVal))
          showValidationError(userEmailField, invalidEmailError);
        else removeValidationError(userEmailField);

      userFullnameParts.forEach((field) => {
        const fieldValue = field.value;

        if (!field.classList.contains('_error-validate')) {
          if (!validateUserNameOrSurname(fieldValue))
            showValidationError(field, invalidNameOrSurnameError);
          else removeValidationError(field);
        }
      });

      if (validateEmail(userEmailVal) && userEmailVal !== '') {
        errorValidateFields.forEach((element) => element.remove());
        removeHash();
        alert('Form is successfully submitted! Please wait for a while!'); // eslint-disable-line no-alert
        submitForm(loginForm);
      }
    }

    if (window.location.hash === '') {
      userFieldsCollection.forEach((field) => {
        if (field.type === 'email') {
          const emailFieldVal = field.value;

          if (!field.classList.contains('_error-validate'))
            if (!validateEmail(emailFieldVal))
              showValidationError(field, invalidEmailError);
            else removeValidationError(field);
        }

        if (field.type === 'password') {
          const passFieldVal = field.value;

          if (passFieldVal === '')
            showValidationError(field, emptyRequiredFieldError);

          if (passFieldVal !== '' && field.value.length < 9)
            showValidationError(field, invalidPassLengthError);

          if (
            passFieldVal !== '' &&
            passFieldVal.length >= 9 &&
            !validateUserPass(passFieldVal)
          )
            showValidationError(field, invalidPassError);

          if (
            passFieldVal !== '' &&
            passFieldVal.length >= 9 &&
            validateUserPass(passFieldVal) &&
            field.classList.contains('_error-validate')
          )
            removeValidationError(field);
        }
      });

      if (
        emptyLoginFields.length === 0 &&
        validateEmail(userEmailVal) &&
        validateUserPass(userPassVal)
      ) {
        errorValidateFields.forEach((element) => element.remove());
        alert('Please wait...'); // eslint-disable-line no-alert
        submitForm(loginForm);
      }
    }
  });
}
// Form Validation

export {
  validateEnterForm,
  restrictDuplicateUsername,
  removeValidationError,
  showValidationError,
  sendScreenResolutionToServer,
};

// if (window.location.hash !== '#registration') {
//   userFieldsCollection.forEach((field) => {
//     if (field.type === 'email') {
//       const emailFieldVal = field.value;

//       if (!field.classList.contains('_error-validate'))
//         if (!validateEmail(emailFieldVal))
//           showValidationError(field, invalidEmailError);
//         else removeValidationError(field);
//     }

//     if (field.type === 'password') {
//       const passFieldVal = field.value;

//       if (passFieldVal === '')
//         showValidationError(field, emptyRequiredFieldError);

//       if (passFieldVal !== '' && field.value.length < 9)
//         showValidationError(field, invalidPassLengthError);

//       if (
//         passFieldVal !== '' &&
//         passFieldVal.length >= 9 &&
//         !validateUserPass(passFieldVal)
//       )
//         showValidationError(field, invalidPassError);

//       if (
//         passFieldVal !== '' &&
//         passFieldVal.length >= 9 &&
//         validateUserPass(passFieldVal) &&
//         field.classList.contains('_error-validate')
//       )
//         removeValidationError(field);
//     }
//   });

//   if (emptyLoginFields.length === 0 && validateEmail(userEmailVal)) {
//     errorValidateFields.forEach((element) => element.remove());
//     alert('Please wait...'); // eslint-disable-line no-alert
//     submitForm(loginForm);
//   }
// }
