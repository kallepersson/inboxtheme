const _styleElement = document.createElement("style");
_styleElement.innerText = _css;

const init = (evt) => {
  document.head.appendChild(_styleElement);
  nodesInit();
  menuInit();
  updateTitle();
  toggleTheme();
}

const toggleTheme = () => {
  document.body.classList.toggle("_in");
}

const updateTitle = () => {
  const observer = new MutationObserver(() => {
    const { title } = nodes;
    let linkElements = document.querySelectorAll(".aim .n0");
    if (title && linkElements.length > 0) {
      handleHashChange();
      observer.disconnect();
    }
  });
  observer.observe(document.body, {subtree:true, childList:true});
}

const handleHashChange = (evt) => {
  let hash = window.location.hash;
  document.body.dataset.hash = hash;
  const { title } = nodes;
  let linkElement = document.querySelector(`.aim a[href$="${hash}"]`);
  if (!title || !linkElement) {
    return;
  }
  let titleSpan = title.querySelector("._inTitle")
  if (!titleSpan) {
    titleSpan = document.createElement("span");
    titleSpan.classList.add("_inTitle");
    title.appendChild(titleSpan);
  }
  titleSpan.innerText = linkElement.innerText;
  title.href = linkElement.href;
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

if (document.head) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
