
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    document.body.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
    document.body.classList.remove("scrolled");
  }
});
