import './index.html';
import './style.scss';
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
  const amountOfOnlineField = document.querySelector('.online-now__amount');

  // eslint-disable-next-line no-shadow
  function updateOnlineUsers(amountOfOnline) {
    $.ajax({
      url: './assets/php/teststatus/online-amount.php',
      method: 'post',
      data: { amountOfOnline },
      success: (response) => {
        if (response) {
          const responseFromServer = JSON.parse(response);

          if (responseFromServer.status === 'success') {
            amountOfOnlineField.textContent = responseFromServer.online;
          }
        }
      },
    });

    // window.setTimeout(updateOnlineUsers, 3000);
  }

  setInterval(() => {
    const amountOfOnline = Number(amountOfOnlineField.textContent);
    updateOnlineUsers(amountOfOnline);
  }, 1200000);
});
