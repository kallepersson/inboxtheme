const _styleElement = document.createElement("style");
_styleElement.innerText = _css;

const init = (evt) => {
  document.head.appendChild(_styleElement);
  reorderMenuItems();
  updateTitle();
  toggleTheme();
}

const menuItems = [
  { label: 'inbox',     className: '.aHS-bnt' },
  { label: 'snoozed',   className: '.aHS-bu1' },
  { label: 'done',      className: '.aHS-aHO' },
  { label: 'drafts',    className: '.aHS-bnq' },
  { label: 'sent',      className: '.aHS-bnu' },
  { label: 'spam',      className: '.aHS-bnv' },
  { label: 'trash',     className: '.aHS-bnx' },
  { label: 'starred',   className: '.aHS-bnw' },
  { label: 'important', className: '.aHS-bns' },
  { label: 'chats',     className: '.aHS-aHP' },
];

const reorderMenuItems = () => {
  const observer = new MutationObserver(() => {
    const parent = document.querySelector('.wT .byl');
    const refer = document.querySelector('.wT .byl>.TK');

    const menuItemNodes = menuItems.map(({ className }) =>
      queryParentSelector(document.querySelector(className), '.aim')
    );
    const [
      inbox, snoozed, done, drafts, sent,
      spam, trash, starred, important, chats
    ] = menuItemNodes;

    if (
      parent && refer &&
      inbox && snoozed && done && drafts && sent &&
      spam && trash && starred && important && chats
    ) {
      /* Gmail will execute its script to add element to the first child, so
       * add one placeholder for it and do the rest in the next child.
       */
      const placeholder = document.createElement('div');
      placeholder.classList.add('TK');
      placeholder.style.cssText = 'padding: 0; border: 0;';

      // Assign link href which only show archived mail
      done.querySelector('a').href = '#search/-is%3Ainbox';

      // Remove id attribute from done element for preventing event override from Gmail
      done.firstChild.removeAttribute('id');

      // Manually add on-click event to done elment
      done.addEventListener('click', () => window.location.assign('#search/-is%3Ainbox'));

      const newNode = document.createElement('div');
      newNode.classList.add('TK');
      newNode.appendChild(inbox);
      newNode.appendChild(snoozed);
      newNode.appendChild(done);
      parent.insertBefore(placeholder, refer);
      parent.insertBefore(newNode, refer);
      refer.appendChild(drafts);
      refer.appendChild(sent);
      refer.appendChild(trash);
      refer.appendChild(spam);
      bindEventToMenuItems(menuItemNodes);
      observer.disconnect();
    }
  });
  observer.observe(document.body, {subtree:true, childList:true});
};

const activeMenuItem = (target, nodes) => {
  nodes.map(node => node.firstChild.classList.remove('nZ'));
  target.firstChild.classList.add('nZ');
};

const bindEventToMenuItems = (nodes) => {
  nodes.map(node =>
    node.addEventListener('click', () => activeMenuItem(node, nodes))
  );
};

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
  if (!elm) {
    return null;
  }
  var parent = elm.parentElement;
  while (!parent.matches(sel)) {
    parent = parent.parentElement;
    if (!parent) {
      return null;
    }
  }
  return parent;
}

if (document.head) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
