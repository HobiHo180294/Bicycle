// Form variables
const loginForm = document.querySelector('.area-login__form');
const requiredLoginFields = loginForm.querySelectorAll('[required]');

// User data variables
const userEmail = document.querySelector('.email__field');

function validateEmail(email) {
  const regExpEmail = /^[A-Z0-9._%+-]{5,}@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  return regExpEmail.test(String(email));
}

// Form Validation
function validateLoginForm() {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userEmailVal = userEmail.value;

    const emptyLoginFields = Array.from(requiredLoginFields).filter(
      (input) => input.value === ''
    );

    requiredLoginFields.forEach((field) => {
      if (field.value === '') {
        field.classList.add('_error-validate');
        field.nextElementSibling.textContent =
          'Please, fill in the required field!';
      } else {
        field.classList.remove('_error-validate');
        field.nextElementSibling.textContent = '';
      }
    });

    if (!userEmail.classList.contains('_error-validate'))
      if (!validateEmail(userEmailVal)) {
        userEmail.classList.add('_error-validate');
        userEmail.nextElementSibling.textContent =
          'Please enter a valid e-mail';
      } else {
        userEmail.classList.remove('_error-validate');
        userEmail.nextElementSibling.textContent = '';
      }

    if (emptyLoginFields.length === 0 && validateEmail(userEmailVal)) {
      loginForm.submit();
      loginForm.reset();
      alert('Please wait...'); // eslint-disable-line no-alert
    }
  });
}
// Form Validation

export default validateLoginForm;
