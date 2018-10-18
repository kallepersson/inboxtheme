const reorderMenuItems = () => {
  const observer = new MutationObserver(() => {
    const parent = document.querySelector('.wT .byl');
    const refer = document.querySelector('.wT .byl>.TK');
    const {
      inbox, snoozed, done, drafts, sent,
      spam, trash, starred, important, chats,
    } = nodes;

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
      bindEvent([
        inbox, snoozed, done, drafts, sent,
        spam, trash, starred, important, chats,
      ]);
      observer.disconnect();
    }
  });
  observer.observe(document.body, {subtree:true, childList:true});
};

const activeMenuItem = (target, nodes) => {
  nodes.map(node => node.firstChild.classList.remove('nZ'));
  target.firstChild.classList.add('nZ');
};

const bindEvent = (nodes) => {
  nodes.map(node =>
    node.addEventListener('click', () =>
      activeMenuItem(node, nodes)
    )
  );
};

const menuInit = () => {
  reorderMenuItems();
};
