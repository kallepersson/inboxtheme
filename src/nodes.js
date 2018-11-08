const _nodes = {};

const setupNodes = () => {
  const observer = new MutationObserver(() => {
    // menu items
    [
      { label: 'inbox',     selector: '.aHS-bnt' },
      { label: 'snoozed',   selector: '.aHS-bu1' },
      { label: 'done',      selector: '.aHS-aHO' },
      { label: 'drafts',    selector: '.aHS-bnq' },
      { label: 'sent',      selector: '.aHS-bnu' },
      { label: 'spam',      selector: '.aHS-bnv' },
      { label: 'trash',     selector: '.aHS-bnx' },
      { label: 'starred',   selector: '.aHS-bnw' },
      { label: 'important', selector: '.aHS-bns' },
      { label: 'chats',     selector: '.aHS-aHP' },
    ].map(({ label, selector }) => {
      const node = queryParentSelector(document.querySelector(selector), '.aim');
      if (node) {
        _nodes[label] = node;
      }
    });

    // others
    [
      { label: 'title',          selector: 'a.gb_Je' },
      { label: 'back',           selector: '.lS'     },
      { label: 'archive',        selector: '.lR'     },
      { label: 'resportSpam',    selector: '.nN'     },
      { label: 'deleteMail',     selector: '.bvt'    },
      { label: 'markUnread',     selector: '.uUQygd' },
      { label: 'moveTo',         selector: '.ns'     },
      { label: 'addLabel',       selector: '.mw'     },
      { label: 'more',           selector: '.nf'     },
      { label: 'messageSection', selector: '.Bs'     },
    ].map(({ label, selector }) => {
      const node = document.querySelector(selector);
      if (node) {
        _nodes[label] = node;
      }
    });
  });
  observer.observe(document.body, {subtree:true, childList:true});
};
