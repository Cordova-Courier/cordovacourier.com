document.addEventListener("DOMContentLoaded", function () {
  console.log("NAVBAR.JS loaded");

  setTimeout(() => {
    const navbar = document.querySelector(".main-navbar");
    const logo = document.querySelector(".top-logo-overlap") || document.querySelector(".top-logo");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!navbar) {
      console.warn("main-navbar NOT FOUND");
      return;
    }

    console.log("Scroll listener initialized");

    // Scroll-triggered navbar update
    window.addEventListener("scroll", () => {
      console.log("ScrollY =", window.scrollY);
      if (window.scrollY > 5) {
        navbar.classList.add("scrolled");
        console.log("Navbar SCROLLED");
      } else {
        navbar.classList.remove("scrolled");
        console.log("Navbar UN-SCROLLED");
      }
    });

    // Hamburger toggle
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("open");
      });
    }

    // Close mobile menu on nav link click
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }, 100);
});
