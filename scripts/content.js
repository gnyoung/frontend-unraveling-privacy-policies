const removeHiddenText = (node) => {
  if (node.parentNode.nodeName == "SCRIPT" || 
      node.parentNode.nodeName == "STYLE" ||
      node.nodeValue.trim() === "") {
    return NodeFilter.FILTER_REJECT;
  } else {
    return NodeFilter.FILTER_ACCEPT;
  }
}

(async () => {
  let walker = document.createTreeWalker(document.body, 
      NodeFilter.SHOW_TEXT, removeHiddenText, false);

  text = "";
  while (walker.nextNode()) {
    text += walker.currentNode.textContent + " ";
  }
  // console.log(text);
  
  await chrome.runtime.sendMessage({ website: location.href, text: text }, (response) => {
    console.log(response);
  });
})();



