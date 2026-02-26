window.addEventListener("scroll", () => {
  const navbar = document.getElementById("header");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
