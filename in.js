const _styleElement = document.createElement("style");
_styleElement.innerText = _css;

const init = (evt) => {
  document.head.appendChild(_styleElement);
  console.log("ready", _styleElement.parentNode)
}

const handleHashChange = (evt) => {
  console.log("#", window.location.hash);
  document.body.dataset.hash = window.location.hash;
}

window.addEventListener("hashchange", handleHashChange);


if (document.head) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}