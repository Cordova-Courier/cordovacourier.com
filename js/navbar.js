function setupNavbarScrollAndToggle() {
  const navbar = document.getElementById("navbar");
  console.log("📦 setupNavbarScrollAndToggle() running");
  if (!navbar) {
    console.warn("❌ Navbar not found");
    return;
  }

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });
}

function setupMobileMenuToggle() {
  console.log("📦 setupMobileMenuToggle() running");

  const hamburger = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');

  if (!hamburger) {
    console.warn("❌ hamburgerBtn NOT found");
    return;
  }
  if (!menu) {
    console.warn("❌ mobileMenu NOT found");
    return;
  }

  console.log("✅ Hamburger and menu found");

  hamburger.addEventListener('click', () => {
    console.log("☰ Hamburger clicked");
    menu.classList.toggle('open');
    console.log("🔁 Menu open state is now:", menu.classList.contains('open'));
  });

  const menuItems = menu.querySelectorAll('a, button');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      console.log("🧹 Closing menu after click");
      menu.classList.remove('open');
    });
  });
}

window.setupNavbarScrollAndToggle = setupNavbarScrollAndToggle;
window.setupMobileMenuToggle = setupMobileMenuToggle;
