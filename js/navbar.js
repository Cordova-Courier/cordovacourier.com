document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".toggle-button");
  const navbarLinks = document.querySelector(".navbar-links");

  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });

  // Close menu on link click (mobile only)
  const links = document.querySelectorAll(".navbar-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navbarLinks.classList.remove("active");
    });
  });
});
