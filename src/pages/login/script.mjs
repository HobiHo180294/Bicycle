import './index.html';
import './style.scss';
import $ from 'jquery';
import {
  validateEnterForm,
  restrictDuplicateUsername,
  sendScreenResolutionToServer,
} from '../../js/modules/login/functions/_validation.mjs';
import {
  onPageToggle,
  reloadPage,
  buttonToRegistrationPage,
} from '../../js/modules/login/functions/_toggle-registr-login-page.mjs';
import {
  removeHash,
  removeErrorEmptyField,
} from '../../js/modules/functions/_custom-funcs.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // ? VARIABLES
  const userEmailFieldID = document.getElementById('user-email');

  const continueWithEmailButton = document.querySelector(
    '.form__email-continue'
  );

  //! COMMON
  // Toggling to registration page
  buttonToRegistrationPage.addEventListener('click', () => {
    if (!buttonToRegistrationPage.classList.contains('_clicked')) reloadPage();
    else {
      removeHash();
      window.location.reload();
    }
  });
  //! COMMON

  // ! REGISTRATION PAGE
  if (window.location.hash === '#registration') {
    onPageToggle();

    // Prevent username duplications with ajax function and jquery
    // eslint-disable-next-line func-names
    $(userEmailFieldID).on('keyup', function () {
      const userEmailValue = $(this).val();

      if (userEmailValue) restrictDuplicateUsername(userEmailValue);

      removeErrorEmptyField(userEmailFieldID, continueWithEmailButton);
    });
  }
  // ! REGISTRATION PAGE

  //! COMMON
  // Delete validation errors when focusing

  // Send form to the server
  continueWithEmailButton.addEventListener('click', function () {
    const userEmailVal = userEmailFieldID.value;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    sendScreenResolutionToServer(screenWidth, screenHeight, userEmailVal);
    this.setAttribute('type', 'submit');
    validateEnterForm();
  });

  //! COMMON
});
