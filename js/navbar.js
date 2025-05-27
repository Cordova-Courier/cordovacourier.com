function setupNavbarScrollAndToggle() {
  function innerSetupNavbarScrollAndToggle() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return requestAnimationFrame(innerSetupNavbarScrollAndToggle);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
  innerSetupNavbarScrollAndToggle();
}

requestAnimationFrame(setupNavbarScrollAndToggle);

// Mobile menu toggle logic
function setupMobileMenuToggle() {
  const hamburger = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', function() {
      menu.classList.toggle('open');
    });
  } else {
    // Try again on the next animation frame if not found yet
    requestAnimationFrame(setupMobileMenuToggle);
  }
}

requestAnimationFrame(setupMobileMenuToggle);
