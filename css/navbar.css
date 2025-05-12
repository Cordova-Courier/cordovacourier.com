document.addEventListener("DOMContentLoaded", function () {
  console.log("NAVBAR.JS loaded");

  setTimeout(() => {
    const navbar = document.querySelector(".main-navbar");
    const logo = document.querySelector(".top-logo-overlap") || document.querySelector(".top-logo");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!navbar) {
      console.warn("main-navbar not found.");
      return;
    }

    console.log("Scroll listener initialized");

    // Scroll-triggered navbar update
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        navbar.classList.add("scrolled");
        if (logo) {
          logo.src = "/images/branding/cordova-navbar-logo.png";
          logo.style.height = "40px";
          logo.style.position = "static";
        }
      } else {
        navbar.classList.remove("scrolled");
        if (logo) {
          logo.src = "/images/branding/cordova-logo.png";
          logo.style.height = "140px";
          logo.style.position = "absolute";
          logo.style.top = "-40px";
        }
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
  }, 100); // slight delay to ensure navbar is injected
});
