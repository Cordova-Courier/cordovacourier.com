document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  // Wait until navbar is in the DOM
  if (!navbar) return;

  const navbarTop = document.querySelector(".navbar-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
      if (navbarTop) navbarTop.style.display = "none";
    } else {
      navbar.classList.remove("scrolled");
      if (navbarTop) navbarTop.style.display = "flex";
    }
  });
});
