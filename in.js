const _styleElement = document.createElement("style");
_styleElement.innerText = _css;

const init = (evt) => {
  document.head.appendChild(_styleElement);
  updateTitle();
}

const updateTitle = () => {
  const observer = new MutationObserver(() => {
    let titleElement = document.querySelector("a.gb_De");
    let linkElements = document.querySelectorAll(".aim .n0");
    if ( titleElement && linkElements.length > 0) {
      handleHashChange();
      observer.disconnect();
    }
  });
  observer.observe(document.body, {subtree:true, childList:true});
}

const handleHashChange = (evt) => {
  let hash = window.location.hash;
  document.body.dataset.hash = hash;
  let linkElement = document.querySelector(`.aim a[href$="${hash}"]`);
  let titleElement = document.querySelector("a.gb_De");
  if (!titleElement || !linkElement) {
    return;
  }
  titleElement.innerText = linkElement.innerText;
  titleElement.href = linkElement.href;
}

window.addEventListener("hashchange", handleHashChange);

if (document.head) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}