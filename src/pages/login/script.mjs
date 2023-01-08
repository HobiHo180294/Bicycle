import './index.html';
import './style.scss';
import validateLoginForm from '../../js/modules/login/_validation.mjs';
import {
  onPageToggle,
  reloadPage,
  buttonToRegistrationPage,
} from '../../js/modules/login/_toggle-registr-login-page.mjs';
import { removeHash } from '../../js/modules/functions/_custom-funcs.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // Validation Login Page
  validateLoginForm();

  // Toggling to registration page
  buttonToRegistrationPage.addEventListener('click', () => {
    if (!buttonToRegistrationPage.classList.contains('_clicked')) reloadPage();
    else {
      removeHash();
      window.location.reload();
    }
  });

  if (window.location.hash === '#registration') onPageToggle();
});
