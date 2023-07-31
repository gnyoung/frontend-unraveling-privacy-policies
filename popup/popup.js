const categoryButtons = document.getElementsByClassName("category");

Array.from(categoryButtons).forEach((categoryButton) => {
  categoryButton.addEventListener("click", () => {
    const categoryContent = categoryButton.nextElementSibling;
    if (categoryContent.style.display == "block") {
      categoryContent.style.display = "none";
    } else {
      categoryContent.style.display = "block";
    }
  });
});
