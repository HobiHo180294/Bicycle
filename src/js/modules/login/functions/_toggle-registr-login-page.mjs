import { removeDOMElement } from '../../functions/_custom-funcs.mjs';

const loginForm = document.querySelector('.area-login__form');
const userPassBlock = document.querySelector('.password');
const buttonToRegistrationPage = document.querySelector(
  '.footer-login__register'
);
const fieldsetElement = document.querySelector('.form__group_primary');

function createUserNameAndSurnameFields() {
  return `<div class="form__real-name_wrap real-name _user-info">
  <input
    required
    type="text"
    id="realName"
    autocomplete="off"
    placeholder=" "
    class="real-name__field _user-info__field"
    name="real-name"
  />
  <div class="area-login__form_error"></div>
  <label
    class="real-name__label _user-info__label"
    for="realName"
  >
    Your name
  </label>
</div>

<div
  class="form__user-surname_wrap user-surname _user-info"
>
  <input
    required
    type="text"
    id="userSurname"
    autocomplete="off"
    placeholder=" "
    class="user-surname__field _user-info__field"
    name="user-surname"
  />
  <div class="area-login__form_error"></div>
  <label
    class="user-surname__label _user-info__label"
    for="userSurname"
  >
    Your surname
  </label>
</div>`;
}

const descriptionFormActionText = document.querySelector('.header-login__text');

function onPageToggle() {
  removeDOMElement(userPassBlock);
  buttonToRegistrationPage.classList.add('_clicked');
  buttonToRegistrationPage.textContent = 'Back to login page';
  descriptionFormActionText.textContent = 'Enter your email to register';
  fieldsetElement.insertAdjacentHTML(
    'beforeend',
    createUserNameAndSurnameFields()
  );
  loginForm.setAttribute('action', './assets/php/login/registration.php');
}

function reloadPage() {
  window.location.hash = 'registration';
  window.location.reload();
}

export { onPageToggle, reloadPage, buttonToRegistrationPage };
