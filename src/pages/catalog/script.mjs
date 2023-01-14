//  http://anastasiia_but.com/web-shop/bicycle/dist/catalog.html
import $ from 'jquery';

import './index.html';

import json from '../../assets/json/json.json';

// eslint-disable-next-line import/extensions, no-unused-vars

import './style.scss';

let orderIdCount = 1;

window.onload = function () {
  // eslint-disable-next-line no-use-before-define
  document.addEventListener('click', documentActions);
  console.log('hello stupid web');

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
      // eslint-disable-next-line no-new-object

      const orderObj = {};
      orderObj.id = orderIdCount++;

      // eslint-disable-next-line no-new-object

      const products = document.querySelectorAll('.cart-list__item');

      products.forEach((element) => {
        const productObjId = element.dataset.cartPid;

        const productObjImage = element.querySelector(
          '.products__image-img'
        ).src;

        const productObjTitle =
          element.querySelector('.cart-list__title').textContent;

        const productObjPrice =
          element.querySelector('.cart-list__price').innerHTML;

        const productObjQuantity = element.querySelector(
          '.cart-list__quantity span'
        ).innerHTML;

        const cartObj = new Object();

        orderObj.order = cartObj;

        cartObj.id = productObjId;
        cartObj.image = productObjImage;
        cartObj.title = productObjTitle.trim();
        cartObj.price = productObjPrice;
        cartObj.quantity = productObjQuantity;
        cartObj.isPaid = 'not';

        const order = JSON.stringify(orderObj);

        $.ajax({
          url: './assets/php/catalog/cart.php',
          method: 'post',
          // dataType: 'json' /* Тип данных в ответе (xml, json, script, html). */,
          data: { order },
          success: (response) => {
            if (response) console.log(response);
          },
        });
      });
      e.preventDefault();
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
