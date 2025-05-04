document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".main-navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const closeBtn = document.querySelector(".menu-close");

  // Handle scroll to add/remove background
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // trigger on load

  // Ensure mobile menu is closed on page load
  if (navLinks) {
    navLinks.classList.remove("open");
  }

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Close menu on any nav link click
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // Close menu on manual "X" button click
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  }
});
