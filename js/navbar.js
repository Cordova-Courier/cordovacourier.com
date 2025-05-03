// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('mainNavbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
