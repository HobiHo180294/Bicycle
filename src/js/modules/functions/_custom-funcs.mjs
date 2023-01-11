function removeDOMElement(elem) {
  elem.remove();
}

function removeHash() {
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  );
}

function disableButton(button) {
  button.setAttribute('disabled', '');
}

function enableButton(button) {
  button.removeAttribute('disabled', '');
}

export { removeDOMElement, removeHash, enableButton, disableButton };
