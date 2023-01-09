import { removeDOMElement } from '../../functions/_custom-funcs.mjs';

const loginForm = document.querySelector('.area-login__form');
const userPassBlock = document.querySelector('.password');
const buttonToRegistrationPage = document.querySelector(
  '.footer-login__register'
);

const descriptionFormActionText = document.querySelector('.header-login__text');

function onPageToggle() {
  removeDOMElement(userPassBlock);
  buttonToRegistrationPage.classList.add('_clicked');
  buttonToRegistrationPage.textContent = 'Back to login page';
  descriptionFormActionText.textContent = 'Enter your email to register';
  loginForm.setAttribute('action', './assets/php/login/registration.php');
}

function reloadPage() {
  window.location.hash = 'registration';
  window.location.reload();
}

export { onPageToggle, reloadPage, buttonToRegistrationPage };
