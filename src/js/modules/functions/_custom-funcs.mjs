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

export { removeDOMElement, removeHash };
