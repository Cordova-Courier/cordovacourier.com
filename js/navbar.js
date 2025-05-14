// Navbar scroll behavior + mobile toggle

function setupNavbarScrollAndToggle() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return requestAnimationFrame(setupNavbarScrollAndToggle);

  const navbarTop = document.querySelector(".navbar-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
      if (navbarTop) navbarTop.style.display = "none";
    } else {
      navbar.classList.remove("scrolled");
      if (navbarTop) navbarTop.style.display = "flex";
    }
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("open");
  }
}

// Ensure setup runs when DOM is ready and navbar is injected
requestAnimationFrame(setupNavbarScrollAndToggle);

