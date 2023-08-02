const state = {
  categoryButtons: document.getElementsByClassName("category"),
  scanButton: document.getElementById("scan-button")
};

const toggleCategories = (event) => {
  const currentButton = event.target;
  const categoryContent = currentButton.nextElementSibling;
  if (categoryContent) {
    if (categoryContent.style.display == "block") {
            categoryContent.style.display = "none";
          } else {
            categoryContent.style.display = "block";
          }
    }
  };

const loadContentScript = async () => {
  const tab = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const activeTabId = tab[0].id;

  chrome.scripting.executeScript({
    target: {tabId: activeTabId},
    files: ["scripts/content.js"]
  });
};

const registerEvents = () => {
  Array.from(state.categoryButtons).forEach((categoryButton) => {
    categoryButton.addEventListener("click", toggleCategories);
  });
  state.scanButton.addEventListener("click", loadContentScript)
};

document.addEventListener("DOMContentLoaded", registerEvents);