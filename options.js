function restoreOptions() {
  chrome.storage.sync.get({
    theme: "default"
  }, function(items) {
    selectTheme(items.theme)
  });
}

function selectTheme(theme) {
  let elm = document.getElementById(theme);
  if (!elm) {
    return;
  }

  let selectedElement = document.querySelector(".selected");
  if (selectedElement) {
    selectedElement.classList.remove("selected");
  }

  elm.className = "selected";

  chrome.storage.sync.set({
    theme: theme,
  }, function() {
    console.log("saved", theme);
  });
}

window.addEventListener("click", function(evt) {
  if (evt.target.tagName != "IMG") {
    return;
  }

  selectTheme(evt.target.id);
});

document.addEventListener("DOMContentLoaded", restoreOptions);