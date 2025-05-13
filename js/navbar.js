document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 5) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  document.querySelectorAll(".nav-links a").forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
});
