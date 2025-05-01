// File: /js/header-scroll.js
window.addEventListener('scroll', function () {
  const header = document.getElementById('site-header');
  if (!header) return; // Safety check
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
