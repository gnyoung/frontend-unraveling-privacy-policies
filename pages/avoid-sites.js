const state = {
  deleteIcons: document.getElementsByClassName("fa-trash"),
  title: document.getElementById("title")
}

const loadWebsites = () => {
  chrome.storage.sync.get(null, (items) => {
    const allKeys = Object.keys(items);
    
    allKeys.forEach((key) => {
      let item = document.createElement("li");
      item.innerText = key;
      let deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash")
      document.getElementById("website-list").appendChild(item).appendChild(deleteIcon);
    });
    registerEvents();
  });
}

const deleteWebsites = (event) => {
  console.log("clicked");
  const currentIcon = event.target;
  const website = currentIcon.parentElement.innerText;
  chrome.storage.sync.remove(website.trim());
  currentIcon.parentElement.remove();
}

const registerEvents = () => {
  Array.from(state.deleteIcons).forEach((icon) => {
    icon.addEventListener("click", deleteWebsites);
  });  
}

document.addEventListener("DOMContentLoaded", loadWebsites);
