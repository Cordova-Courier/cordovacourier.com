function setupNavbarScrollAndToggle() {
  const navbar = document.getElementById("navbar");
  const navbarTop = document.querySelector(".navbar-top");
  const mobileMenu = document.getElementById("mobileMenu");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;

    if (scrollY > 40 && !navbar.classList.contains("scrolled") && !isLandscape) {
      navbar.classList.add("scrolled");
      if (navbarTop && !mobileMenu.classList.contains("open")) {
        navbarTop.style.display = "none";
      }
    } else if ((scrollY <= 40 || isLandscape) && navbar.classList.contains("scrolled")) {
      navbar.classList.remove("scrolled");
      if (navbarTop) {
        navbarTop.style.display = "flex";
      }
    }
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const navbarTop = document.querySelector(".navbar-top");

  if (menu) {
    menu.classList.toggle("open");

    if (menu.classList.contains("open")) {
      navbarTop.style.display = "flex";
    } else if (window.scrollY > 40) {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      if (!isLandscape) navbarTop.style.display = "none";
    }
  }
}

requestAnimationFrame(setupNavbarScrollAndToggle);

