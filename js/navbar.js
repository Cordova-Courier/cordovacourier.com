window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const body = document.body;
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    body.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
    body.classList.remove("scrolled");
  }
});
