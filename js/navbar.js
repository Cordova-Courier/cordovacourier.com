
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".main-navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const closeBtn = document.querySelector(".menu-close");
  const navItems = document.querySelectorAll(".nav-links a");

  // Scroll-triggered background change
  document.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Hamburger click - open menu
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.add("open");
    });
  }

  // Manual close (X button)
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      navLinks.classList.remove("open");
    });
  }

  // Close menu on link click
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
});
