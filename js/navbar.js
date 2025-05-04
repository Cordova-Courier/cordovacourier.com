document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".main-navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const closeBtn = document.querySelector(".menu-close");
  const navItems = document.querySelectorAll(".nav-links a");

  // SCROLL BACKGROUND CHANGE
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // call on page load

  // MOBILE TOGGLE
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  // CLOSE ON LINK CLICK (mobile)
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // CLOSE ON X BUTTON (if exists)
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  }
});
