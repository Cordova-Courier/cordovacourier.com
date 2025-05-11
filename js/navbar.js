document.addEventListener("DOMContentLoaded", function () {
  console.log("NAVBAR.JS loaded");

  setTimeout(() => {
    const navbar = document.querySelector(".main-navbar");
    const logo = document.querySelector(".top-logo-overlap") || document.querySelector(".top-logo");
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");

    if (!navbar) {
      console.warn("main-navbar not found.");
      return;
    }

    console.log("Scroll listener initialized");

    // Scroll-triggered navbar update
    window.addEventListener("scroll", () => {
      console.log("ScrollY:", window.scrollY);
      if (window.scrollY > 5) {
        navbar.classList.add("scrolled");
        console.log("Navbar scrolled on");

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
        console.log("Navbar scrolled off");

        if (logo) {
          logo.src = "/images/branding/cordova-logo.png";
          logo.style.height = "140px";
          logo.style.position = "absolute";
          logo.style.top = "-40px";
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
  }, 100); // slight delay to ensure DOM is updated after navbar fetch
});
