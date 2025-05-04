document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".main-navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const closeBtn = document.querySelector(".menu-close");

  // Apply scrolled class when scrolling
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Optional: Close menu when scrolling
    navLinks.classList.remove("open");
  });

  // Ensure menu is closed on initial load
  if (navLinks) {
    navLinks.classList.remove("open");
  }

  // Toggle menu with hamburger
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  // Close menu on link click
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // Manual close with optional "X" close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  }
});
