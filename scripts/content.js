const accessPageText = () => {
  let walker = document.createTreeWalker(document.body, 
      NodeFilter.SHOW_TEXT);
}

const text = accessPageText();
console.log(text);