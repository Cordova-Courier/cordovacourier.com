// Navbar scroll behavior + mobile toggle

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const mobileMenu = document.getElementById("mobileMenu");

  if (scrollY > 40 && !navbar.classList.contains("scrolled")) {
    navbar.classList.add("scrolled");
    if (navbarTop && !mobileMenu.classList.contains("open")) {
      navbarTop.style.display = "none";
    }
  } else if (scrollY <= 40 && navbar.classList.contains("scrolled")) {
    navbar.classList.remove("scrolled");
    if (navbarTop) {
      navbarTop.style.display = "flex";
    }
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
