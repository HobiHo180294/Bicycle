//  http://anastasiia_but.com/web-shop/bicycle/dist/catalog.html
import $ from 'jquery';

import './index.html';

import json from '../../assets/json/json.json';

// eslint-disable-next-line import/extensions, no-unused-vars

import './style.scss';

// search
let lastResFind = ''; // последний удачный результат
let copy_page = ''; // копия страницы в ихсодном виде

const textFindBtn = document.querySelector('.text-find');
function TrimStr(s) {
  s = s.replace(/^\s+/g, '');
  return s.replace(/\s+$/g, '');
}
textFindBtn.addEventListener('click', () => FindOnPage('text-to-find'));

function FindOnPage(inputId) {
  console.log('work');
  // ищет текст на странице, в параметр передается ID поля для ввода
  let obj = window.document.getElementById(inputId);
  let textToFind;

  if (obj) {
    textToFind = TrimStr(obj.value); // обрезаем пробелы
  } else {
    alert('The entered phrase was not found');
    return;
  }
  if (textToFind == '') {
    alert('You did not enter anything');
    return;
  }

  if (document.body.innerHTML.indexOf(textToFind) == '-1')
    alert('Nothing found, please check your input!');

  if (copy_page.length > 0) document.body.innerHTML = copy_page;
  else copy_page = document.body.innerHTML;

  document.body.innerHTML = document.body.innerHTML.replace(
    eval('/name=' + lastResFind + '/gi'),
    ' '
  ); // стираем предыдущие якори для скрола
  document.body.innerHTML = document.body.innerHTML.replace(
    eval('/' + textToFind + '/gi'),
    '<a name=' +
      textToFind +
      " style='background: #64c29e'>" +
      textToFind +
      '</a>'
  ); // Заменяем найденный текст ссылками с якорем;
  lastResFind = textToFind; // сохраняем фразу для поиска, чтобы в дальнейшем по ней стереть все ссылки
  window.location = '#' + textToFind; // перемещаем скрол к последнему найденному совпадению

  return false;
}

function getUserSurname(welcomeUserSurname) {
  let userSurname;
  $.ajax({
    url: './assets/php/catalog/welcome.php',
    method: 'post',
    async: false,
    data: {
      welcomeUserSurname,
    },
    success: (response) => {
      try {
        if (response) {
          const responseFromServer = JSON.parse(response);

          if (responseFromServer.status === 'success') {
            userSurname = responseFromServer.userSurname;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return userSurname;
}

function updateOnlineUsers(amountOfOnline, nowOnlineField) {
  $.ajax({
    url: './assets/php/teststatus/online-amount.php',
    method: 'post',
    data: { amountOfOnline },
    success: (response) => {
      try {
        if (response) {
          const responseFromServer = JSON.parse(response);

          if (responseFromServer.status === 'success') {
            nowOnlineField.textContent = responseFromServer.online;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
}

let orderIdCount = 1;

window.onload = function () {
  const welcomeUser = document.querySelector('.welcome__user');
  const nowOnlineField = document.querySelector('.welcome__amount-online span');

  const userSurname = getUserSurname('userSurname');

  if (userSurname) {
    welcomeUser.textContent = `Hello Mr/Mrs ${userSurname}`;

    setInterval(() => {
      const amountOfOnline = Number(nowOnlineField.textContent);
      updateOnlineUsers(amountOfOnline, nowOnlineField);
    }, 3000);
  }

  // eslint-disable-next-line no-use-before-define
  document.addEventListener('click', documentActions);

  getUserName('value');

  // Actions (click)
  function documentActions(e) {
    const targetElement = e.target;

    if (targetElement.classList.contains('products__btn-add')) {
      const productId = targetElement.closest('.products__item').dataset.pid;
      // eslint-disable-next-line no-use-before-define
      addToCart(targetElement, productId);
      // eslint-disable-next-line no-unused-expressions
      e.preventDefault;
    }

    // Shopping cart
    if (targetElement.classList.contains('shopping-cart__icon')) {
      if (document.querySelector('.cart-list').children.length > 0) {
        document
          .querySelector('.cart-header__body')
          .classList.toggle('_active'); // toggle
      }
      e.preventDefault();
    } else if (
      !targetElement.closest('.header__shopping-cart') &&
      !targetElement.classList.contains('products__btn-add') &&
      !targetElement.classList.contains('products__btn-remove') &&
      !targetElement.classList.contains('cart-list__remove')
    ) {
      document.querySelector('.cart-header__body').classList.remove('_active');
    } // Remove from cart
    if (targetElement.classList.contains('products__btn-remove')) {
      // eslint-disable-next-line no-shadow
      const targetElement = document.querySelector('.cart-list__remove');
      const productId =
        targetElement.closest('.cart-list__item').dataset.cartPid;
      // eslint-disable-next-line no-use-before-define
      updateCart(targetElement, productId, false);
      e.preventDefault();
    }

    if (targetElement.classList.contains('cart-list__remove')) {
      const productId =
        targetElement.closest('.cart-list__item').dataset.cartPid;

      // eslint-disable-next-line no-use-before-define
      updateCart(targetElement, productId, false);
      e.preventDefault();
    }

    // Create an object
    if (targetElement.classList.contains('cart-list__btn-active')) {
      console.log(targetElement);
      // targetElement.setAttribute('type', 'button');

      // eslint-disable-next-line no-new-object
      let username = getUserName('New user name');
      console.log(username);

      targetElement.setAttribute('type', 'submit');

      const orderObj = {};
      orderObj.id = orderIdCount++;
      orderObj.username = username;
      orderObj.isPaid = 'not';

      let orderObjId = orderObj.id;
      const orderObjIsPaid = orderObj.isPaid;
      // eslint-disable-next-line no-new-object

      const products = document.querySelectorAll('.cart-list__item');

      products.forEach((element) => {
        const productObjId = element.dataset.cartPid;

        const productObjImage = element.querySelector(
          '.products__image-img'
        ).src;

        const productObjTitle = element
          .querySelector('.cart-list__title')
          .textContent.trim();

        const productObjPrice = element
          .querySelector('.cart-list__price')
          .innerHTML.trim();

        const productObjQuantity = element
          .querySelector('.cart-list__quantity span')
          .innerHTML.trim();

        const cartObj = new Object();

        orderObj.order = cartObj;

        cartObj.id = productObjId;
        cartObj.image = productObjImage;
        cartObj.title = productObjTitle.trim();
        cartObj.price = productObjPrice.slice(0, -1);
        cartObj.quantity = productObjQuantity;

        const order = orderObj;

        const orderId = orderObjId;

        const itemId = productObjId;

        const itemPrice = cartObj.price;

        $.ajax({
          url: './assets/php/catalog/cart.php',
          method: 'post',
          // async: false,
          data: {
            order,
            itemId,
            orderId,
            username,
            productObjImage,
            productObjTitle,
            itemPrice,
            productObjQuantity,
            orderObjIsPaid,
          },
          success: (response) => {
            if (response) console.log(response);
          },
        });
      });
    }
  }

  // AddToCart
  function addToCart(productButton, productId) {
    if (!productButton.classList.contains('_hold')) {
      productButton.classList.add('_hold');
      productButton.classList.add('_fly');

      const cart = document.querySelector('.header__shopping-cart');
      const product = document.querySelector(`[data-pid="${productId}"]`);
      const productImage = product.querySelector('.products__image-img');

      const productImageFly = productImage.cloneNode(true);

      const productImageFlyWidth = productImage.offsetWidth;
      const productImageFlyHeight = productImage.offsetHeight;

      const productImageFlyTop = productImage.getBoundingClientRect().top;
      const productImageFlyLeft = productImage.getBoundingClientRect().left;

      productImageFly.setAttribute('class', '_flyImage _ibg');
      productImageFly.style.cssText = `
      left: ${productImageFlyLeft}px;
      top: ${productImageFlyTop}px;
      width: ${productImageFlyWidth}px;
      height: ${productImageFlyHeight}px;
      `;

      document.body.append(productImageFly);

      const cartFlyLeft = cart.getBoundingClientRect().right;
      const cartFlyTop = cart.getBoundingClientRect().top;

      productImageFly.style.cssText = `
      left: ${cartFlyLeft}px;
      top: ${cartFlyTop}px;
      width: 0px;
      height: 0px;
      opacity: 1;
      `;

      productImageFly.addEventListener('transitionend', () => {
        if (productButton.classList.contains('_fly')) {
          productImageFly.remove();
          // eslint-disable-next-line no-use-before-define
          updateCart(productButton, productId);
          productButton.classList.remove('_fly');
        }
      });
    }
  }

  // UpdateCart
  function updateCart(productButton, productId, productAdd = true) {
    const cart = document.querySelector('.header__shopping-cart');
    const cartForm = document.querySelector('.cart-header__body');
    const cartIcon = cart.querySelector('.shopping-cart');
    const cartQuantity = cart.querySelector('span');

    const cartProduct = document.querySelector(
      `[data-cart-pid="${productId}"]`
    );
    const cartList = document.querySelector('.cart-list');

    // Add
    if (productAdd) {
      if (cartQuantity) {
        // eslint-disable-next-line no-plusplus
        cartQuantity.innerHTML = ++cartQuantity.innerHTML; // number at the cart
        cartQuantity.classList.add('shopping-cart__body');
      } else {
        cartIcon.insertAdjacentHTML(
          'beforeend',
          `<span class="shopping-cart__body" >1</span>`
        );
      }
      if (!cartProduct) {
        const product = document.querySelector(`[data-pid="${productId}"]`);
        const cartBtn = document.querySelector('.cart-list__btn');

        const cartProductImage =
          product.querySelector('.products__image').innerHTML;

        const cartProductTitle =
          product.querySelector('.products__name').innerHTML;

        const cartProductPrice =
          product.querySelector('.products__price').innerHTML;

        const cartProductContent = `
          <a href="#" class="cart-list__image">${cartProductImage}</a>
          <div class="cart-list__body">
            <a href="#" class="cart-list__title" name="title">${cartProductTitle}</a>
            <div class="cart-list__quantity">
              Quantity:
              <span name="quantity">1</span>
            </div>
            <div class="cart-list__price" name="price">${cartProductPrice}</div>
            <button class="cart-list__remove">Remove <span> X </span></button>
          </div>
        `;
        cartBtn.classList.add('cart-list__btn-active');
        cartList.insertAdjacentHTML(
          'beforeend',
          `
          <li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`
        );
      } else {
        const cartProductQuantity = cartProduct.querySelector(
          '.cart-list__quantity span'
        );

        // eslint-disable-next-line no-plusplus
        cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
      }
      // after all
      productButton.classList.remove('_hold');
    } else {
      const cartProductQuantity = cartProduct.querySelector(
        '.cart-list__quantity span'
      );
      // eslint-disable-next-line no-plusplus
      cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;

      // eslint-disable-next-line radix
      if (!parseInt(cartProductQuantity.innerHTML)) {
        cartProduct.remove();
      }

      // eslint-disable-next-line no-plusplus
      const cartQuantityValue = --cartQuantity.innerHTML;

      if (cartQuantityValue) {
        cartQuantity.innerHTML = cartQuantityValue;
      } else {
        cartQuantity.remove();
        cartForm.classList.remove('_active');
      }
    }
  }
};

function getUserName(userName) {
  let username;
  $.ajax({
    url: './assets/php/catalog/get-user.php',
    method: 'post',
    async: false,
    data: { userName },
    success: (response) => {
      try {
        if (response) {
          const responseFromServer = JSON.parse(response);

          if (responseFromServer.status === 'success') {
            username = responseFromServer.username;
          }
          if (responseFromServer.status === 'error') {
            const cart = document.querySelector('.header__shopping-cart');
            console.log('nobody');
            cart.style.display = 'none';
          }
        }
      } catch (error) {
        const cart = document.querySelector('.header__shopping-cart');
        const add = document.querySelectorAll('.products__btn-add');
        const remove = document.querySelectorAll('.products__btn-remove');

        cart.style.display = 'none';

        add.forEach((btn) => {
          btn.style.display = 'none';
        });

        remove.forEach((btn) => {
          btn.style.display = 'none';
        });

        remove.style.display = 'none';
      }
    },
  });
  return username;
}
