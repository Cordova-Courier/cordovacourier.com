document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".main-navbar");
  const logo = document.querySelector(".top-logo-overlap") || document.querySelector(".top-logo");
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  // Scroll-triggered navbar update
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      if (logo) {
        logo.src = "/images/branding/cordova-navbar-logo.png";
        logo.style.height = "40px";
        logo.style.position = "static";
      }
      if (navLinks) {
        navLinks.innerHTML = `
          <li><a href="/">Home</a></li>
          <li><a href="/quote/">Request a Quote</a></li>
          <li><a href="/services/">Services</a></li>
          <li><a href="/service-areas/">Service Areas</a></li>
          <li><a href="/about-us/">About Us</a></li>
          <li><a href="/tracking/">Tracking</a></li>
          <li><a class="cta-btn" href="https://secure.ontime360.com/sites/CordovaCourierLLC/" target="_blank">Customer Portal</a></li>
        `;
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
});

