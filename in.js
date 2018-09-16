const _styleElement = document.createElement("style");
_styleElement.innerText = _css;

const init = (evt) => {
  document.head.appendChild(_styleElement);
  updateTitle();
}

const toggleTheme = () => {
  document.body.classList.toggle("_in");
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
  let titleSpan = titleElement.querySelector("._intitle")
  if (!titleSpan) {
    titleSpan = document.createElement("span");
    titleSpan.classList.add("_intitle");
    titleElement.appendChild(titleSpan);
  }
  titleSpan.innerText = linkElement.innerText;
  titleElement.href = linkElement.href;
}

document.addEventListener("dblclick", (evt) => {
  // temp toggling for now
  if (evt.target.classList.contains("gb_Ed")) {
    toggleTheme();
  }
});

window.addEventListener("hashchange", handleHashChange);

if (document.head) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}