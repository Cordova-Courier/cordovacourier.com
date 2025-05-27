// navbar.js

function setupNavbarScrollAndToggle() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });
}

function setupMobileMenuToggle() {
  const hamburger = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

// Don't invoke the functions here.
// They will be called after the navbar is dynamically injected.
  }
}

requestAnimationFrame(setupMobileMenuToggle);
