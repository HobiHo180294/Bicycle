import './index.html';
import './style.scss';
import $ from 'jquery';
import {
  validateReassignForm,
  throwDefaultPassNotExistsError,
} from '../../js/modules/login/functions/_reassign-validation.mjs';

// eslint-disable-next-line func-names

document.addEventListener('DOMContentLoaded', () => {
  // Vars
  const reassignButton = document.querySelector('.reassign-button');
  const defaultPassField = document.getElementById('default-pass');
  const reassignForm = document.querySelector('.form-confirmation');
  const atLeastOneEmptyErrorField = document.querySelector(
    '.body-reassign__error'
  );
  const atLeastOneEmptyErrorMessage = 'Please fill all the fields!';

  $(reassignButton).on('click', () => {
    $(reassignForm).submit((e) => e.preventDefault());

    const defaultPassValue = $(defaultPassField).val();

    if (defaultPassValue) {
      if ($(atLeastOneEmptyErrorField).hasClass('_error-validate')) {
        $(atLeastOneEmptyErrorField).removeClass('_error-validate');
        $(atLeastOneEmptyErrorField).text('');
      }

      const responseFromServer =
        throwDefaultPassNotExistsError(defaultPassValue);

      if (responseFromServer) {
        if (responseFromServer.status === 'success') {
          $(reassignButton).attr('type', 'submit');
          validateReassignForm();
        }

        if (responseFromServer.status === 'error') {
          throwDefaultPassNotExistsError(defaultPassValue);
        }
      }
    } else {
      $(atLeastOneEmptyErrorField).addClass('_error-validate');
      $(atLeastOneEmptyErrorField).text(atLeastOneEmptyErrorMessage);
    }
  });
});
