// Wait until #navbar exists in the DOM before attaching scroll behavior
function setupScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return requestAnimationFrame(setupScroll);

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

requestAnimationFrame(setupScroll);
