// Scroll-triggered background change
document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".main-navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinks) {
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }
});
