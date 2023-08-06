const state = {
  categoryButtons: document.getElementsByClassName("category"),
  scanButton: document.getElementById("scan-button"),
  letterGrade: document.getElementById("letter-grade"),
  gradeSummary: document.getElementById("grade-summary"),
  loader: document.getElementById("loader"),
  contentDataCollection: document.getElementById("content-collection"),
  contentDataStorage: document.getElementById("content-storage"),
  contentUserRights: document.getElementById("content-rights"),
  contentThirdParty: document.getElementById("content-disclosure"),
  contentDataSecurity: document.getElementById("content-security"),
  avoidButton: document.getElementById("avoid-button")
};

const toggleCategories = (event) => {
  const currentButton = event.target;
  const categoryContent = currentButton.nextElementSibling;
  if (categoryContent.classList.contains("detailed-content")) {
    if (categoryContent.style.display == "block") {
            categoryContent.style.display = "none";
          } else {
            categoryContent.style.display = "block";
          }
    }
  };

const saveWebsite = async () => {
  const tab = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const tabUrl = tab[0].url;

  chrome.storage.sync.set({tabUrl: tabUrl});
}

const loadContentScript = async () => {
  const tab = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const activeTabId = tab[0].id;

  chrome.scripting.executeScript({
    target: {tabId: activeTabId},
    files: ["scripts/content.js"]
  });
};

const displayResponseData = (responseBody) => {
  state.letterGrade.textContent = responseBody["letterGrade"]
  state.gradeSummary.textContent = responseBody["gradeSummary"]
  state.contentDataCollection.textContent = responseBody["aboutDataCollection"]
  state.contentDataStorage.textContent = responseBody["aboutDataStorage"]
  state.contentUserRights.textContent = responseBody["aboutUserRights"]
  state.contentThirdParty.textContent = responseBody["aboutThirdPartySaleDisclosure"]
  state.contentDataSecurity.textContent = responseBody["aboutDataSecurity"]
}

const startLoading = () => {
  state.scanButton.style.display = "none";
  state.loader.style.display = "block";
}

const showSummary = (responseBody) => {
  setTimeout(() => {
    if (responseBody) {
      state.loader.style.display = "none";
      state.letterGrade.style.display = "block";
      state.gradeSummary.style.display = "block";
    }
  }, 1000);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const text = message.text;

  if (text) {
    sendResponse("Text received.");
  }

  const requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");

  const requestData = JSON.stringify(message);

  const requestOptions = {
    method: 'POST',
    headers: requestHeaders,
    body: requestData,
    redirect: 'follow'
  };

  fetch("http://localhost:8080/summaries", requestOptions)
  .then(response => response.json())
  .then((responseBody) => {
    showSummary(responseBody);
    displayResponseData(responseBody);
  }) 
  .catch(error => console.log('error', error));
});

const registerEvents = () => {
  Array.from(state.categoryButtons).forEach((categoryButton) => {
    categoryButton.addEventListener("click", toggleCategories);
  });
  state.scanButton.addEventListener("click", loadContentScript);
  state.scanButton.addEventListener("click", startLoading);
};

document.addEventListener("DOMContentLoaded", registerEvents);