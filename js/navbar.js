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

  // Toggle open/close on hamburger click
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Automatically close the mobile menu when a link or button is clicked
  const menuItems = menu.querySelectorAll('a, button');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

window.setupNavbarScrollAndToggle = setupNavbarScrollAndToggle;
window.setupMobileMenuToggle = setupMobileMenuToggle;// Exported functions will be called after navbar is injected
