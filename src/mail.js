const goBackWhenClickOutside = () => {
  const observer = new MutationObserver(() => {
    const { messageSection } = nodes;
    if (messageSection) {
      document.body.addEventListener('click', (e) => {
        if (!messageSection.contains(e.target)) {
          location.assign(location.hash.split('/')[0]);
        }
      });
      observer.disconnect();
    }
  });
  observer.observe(document.body, {subtree:true, childList:true});
};

const mailInit = () => {
  goBackWhenClickOutside();
};
