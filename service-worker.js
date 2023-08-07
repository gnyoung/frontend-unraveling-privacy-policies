chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  tabUrl = tab.url;
  if (changeInfo.status === "complete") {
    console.log(changeInfo.status)
    chrome.storage.sync.get(tabUrl, (result) => {
      if(result[tabUrl]) {
        chrome.notifications.create("", {
          type: "basic",
          title: "Are you sure you want to visit this site?",
          message: "This site is on your avoid list with Privacy Grader.",
          iconUrl: "images/logo-lock-48.png",
        });
      }
    });
  }
});


