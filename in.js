const _styleElement = document.createElement("style");
_styleElement.innerText = _css;

const init = (evt) => {
  document.head.appendChild(_styleElement);
  updateTitle();
  toggleTheme();
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
  let titleSpan = titleElement.querySelector("._inTitle")
  if (!titleSpan) {
    titleSpan = document.createElement("span");
    titleSpan.classList.add("_inTitle");
    titleElement.appendChild(titleSpan);
  }
  titleSpan.innerText = linkElement.innerText;
  titleElement.href = linkElement.href;
  setupSweepButtons();
}

const setupSweepButtons = () => {
  let sections = document.querySelectorAll(".ae4");
  sections.forEach((section) => {
    let sweepButton = section.querySelector("._inSweep");
    let buttonContainer = section.querySelector(".Cr");
    if (buttonContainer && !sweepButton) {
      sweepButton = document.createElement("button");
      sweepButton.classList.add("_inSweep");
      sweepButton.addEventListener("click", handleSweepButtonClick);
      buttonContainer.insertBefore(sweepButton, buttonContainer.firstChild);
    }
  })
}

/**

*/
const getMessageRowIsStarred = (elm) => {
  const starredButton = elm.querySelector(".T-KT");
  return starredButton && starredButton.classList.contains("T-KT-Jp");
}

/**

*/
const archiveMessageRow = (elm) => {
  const archiveButton = elm.querySelector(".brq");
  if (archiveButton) {
    archiveButton.click();
  }
}

document.addEventListener("dblclick", (evt) => {
  // temp toggling for now
  if (evt.target.classList.contains("gb_Ed")) {
    toggleTheme();
  }
});

const handleSweepButtonClick = (evt) => {
  let section = queryParentSelector(evt.target, ".aDM");
  section.querySelectorAll("tr").forEach((elm) => {
    if (!getMessageRowIsStarred(elm)) {
      archiveMessageRow(elm);
    }
  })
}

window.addEventListener("hashchange", handleHashChange);

const queryParentSelector = (elm, sel) => {
  var parent = elm.parentElement;
  while (!parent.matches(sel)) {
    parent = parent.parentElement;
    if (!parent) {
      return null;
    }
  }
  return parent
}

if (document.head) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}