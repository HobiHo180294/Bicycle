import './index.html';
import './style.scss';
import $ from 'jquery';
import {
  validateEnterForm,
  restrictDuplicateUsername,
  removeValidationError,
} from '../../js/modules/login/functions/_validation.mjs';
import {
  onPageToggle,
  reloadPage,
  buttonToRegistrationPage,
} from '../../js/modules/login/functions/_toggle-registr-login-page.mjs';
import { removeHash } from '../../js/modules/functions/_custom-funcs.mjs';

function removeErrorEmptyField(field) {
  if (field.value === '' && field.classList.contains('_error-validate')) {
    removeValidationError(field);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const userEmailFieldID = document.getElementById('user-email');

  const continueWithEmailButton = document.querySelector(
    '.form__email-continue'
  );

  // Toggling to registration page
  buttonToRegistrationPage.addEventListener('click', () => {
    if (!buttonToRegistrationPage.classList.contains('_clicked')) reloadPage();
    else {
      removeHash();
      window.location.reload();
    }
  });

  if (window.location.hash === '#registration') onPageToggle();

  // Prevent username duplications with ajax function and jquery
  // eslint-disable-next-line func-names
  $(userEmailFieldID).on('keyup', function () {
    const userEmailValue = $(this).val();

    if (userEmailValue) restrictDuplicateUsername(userEmailValue);

    removeErrorEmptyField(userEmailFieldID);
  });

  // UX
  userEmailFieldID.addEventListener('focus', () =>
    removeErrorEmptyField(userEmailFieldID)
  );

  // Send form to the server
  continueWithEmailButton.addEventListener('click', () => {
    if (window.location.hash === '#registration') validateEnterForm();
  });
});

/*
 !!! REFACTORRED CODE
  Validation Login Page
  validateEnterForm();


  const errorValidateEmailField = document.querySelector('.error-email');


  isUserNameExist(idCustomerEmail);
  if (isUserNameExist(idCustomerEmail)) {
    userEmail.classList.add('_error-validate');
    userEmail.nextElementSibling.textContent =
      'This user is already existed!';
  } else {
    userEmail.classList.remove('_error-validate');
    userEmail.nextElementSibling.textContent = '';
  }
*/
