"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[913],{5309:function(t,e,r){function n(t){t.remove()}function o(){window.history.pushState("",document.title,window.location.pathname+window.location.search)}function i(t){t.setAttribute("disabled","")}function u(t){t.removeAttribute("disabled","")}function a(t){t.submit(),t.reset()}function c(t,e){t.classList.add("_error-validate"),t.nextElementSibling.textContent=e}function s(t){t.classList.remove("_error-validate"),t.nextElementSibling.textContent=""}function l(t,e){""===t.value&&t.classList.contains("_error-validate")&&(s(t),e.hasAttribute("disabled")&&u(e))}function f(t){return/^[A-Z0-9._%+-]{2,}@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(String(t))}function d(t){return/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,}$/.test(String(t))}function m(t){return/^[a-zA-Z\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df -]{2,30}$/i.test(String(t))}r.d(e,{An:function(){return d},E6:function(){return m},Iv:function(){return n},K:function(){return s},Mr:function(){return u},Qr:function(){return i},R2:function(){return a},dD:function(){return c},lm:function(){return o},oH:function(){return f},qo:function(){return l}})},4150:function(t,e,r){var n=r(5638),o=r(5309);function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==i(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!==i(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===i(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function c(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var l=document.querySelector(".form-confirmation"),f=l.querySelectorAll("[required]"),d=document.getElementById("new-pass"),m=document.getElementById("confirm-pass"),y=document.querySelectorAll(".form-field__error"),b=document.getElementById("default-pass");function p(t,e){return t.value===e.value}function v(t){var e="";return n.ajax({url:"./assets/php/login/check-default-password.php",method:"post",async:!1,data:{defaultPassValue:t},success:function(t){var r=JSON.parse(t);e=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},r),"error"===r.status&&(0,o.dD)(b,"We cannot find user with this password. Please try again..."),"success"===r.status&&b.classList.contains("_error-validate")&&(0,o.K)(b)}}),e}function h(){l.addEventListener("submit",(function(t){t.preventDefault();var e=Array.from(f).filter((function(t){return""===t.value}));f.forEach((function(t){var e=t.value;""===e&&(0,o.dD)(t,"Please, fill in the required field!"),""!==e&&t.value.length<9&&(0,o.dD)(t,"Password should contain at least 9 characters"),""!==e&&e.length>=9&&!(0,o.An)(e)&&(0,o.dD)(t,"Password should contain at least one capital, lowercase letter and digit"),""!==e&&e.length>=9&&(0,o.An)(e)&&t.classList.contains("_error-validate")&&(0,o.K)(t)})),p(b,d)&&(0,o.dD)(d,"Passwords cannot be equal"),p(d,m)||(0,o.dD)(m,"Passwords do not match"),0===e.length&&c(f).every((function(t){return(0,o.An)(t.value)}))&&!p(b,d)&&!function(t){return c(t).every((function(t){return t.classList.contains("_error-validate")}))}(f)&&p(d,m)&&(y.forEach((function(t){return t.remove()})),alert("Your data is proceessing. Please wait for a while!"),(0,o.R2)(l))}))}document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector(".reassign-button"),e=document.getElementById("default-pass"),r=document.querySelector(".form-confirmation"),o=document.querySelector(".body-reassign__error");n(t).on("click",(function(){n(r).submit((function(t){return t.preventDefault()}));var i=n(e).val();if(i){n(o).hasClass("_error-validate")&&(n(o).removeClass("_error-validate"),n(o).text(""));var u=v(i);u&&("success"===u.status&&(n(t).attr("type","submit"),h()),"error"===u.status&&v(i))}else n(o).addClass("_error-validate"),n(o).text("Please fill all the fields!")}))}))}},function(t){var e=function(e){return t(t.s=e)};t.O(0,[202,638],(function(){return e(1202),e(4150)}));t.O()}]);