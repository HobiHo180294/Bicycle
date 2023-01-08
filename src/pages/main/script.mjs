// IMPORT
import './index.html';
import './style.scss';

// Function for inverting custom image to background image
function ibg() {
  const imgBackground = document.querySelectorAll('.ibg');
  for (let i = 0; i < imgBackground.length; i++) {
    if (imgBackground[i].querySelector('img')) {
      imgBackground[i].style.backgroundImage = `url(${imgBackground[i]
        .querySelector('img')
        .getAttribute('src')})`;
    }
  }
}

ibg();

// // Smooth scrolling to anchors
// $(document).ready(function () {
//   $('.header__burger').click(function (event) {
//     $('.header__burger, .header__nav').toggleClass('active');
//     $('body').toggleClass('lock');
//   });
// });

// // Closing burger menu by clicking on the links
// $(document).ready(function () {
//   $('.header__link').click(function (event) {
//     $('.header__burger, .header__nav').toggleClass('active');
//     $('body').toggleClass('lock');
//   });
// });

// Scroll to anchors

// eslint-disable-next-line func-names
(function () {
  // eslint-disable-next-line func-names
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.header').clientHeight;
    const target = document.querySelector(targetEl);
    const targetPosition = target.getBoundingClientRect().top - headerElHeight;
    const startPosition = window.pageYOffset;
    let startTime = null;

    // eslint-disable-next-line func-names
    const ease = function (t, b, c, d) {
      // eslint-disable-next-line no-param-reassign
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      // eslint-disable-next-line no-plusplus, no-param-reassign
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    // eslint-disable-next-line func-names
    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  // eslint-disable-next-line func-names
  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach((each) => {
      // eslint-disable-next-line func-names
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
})();
