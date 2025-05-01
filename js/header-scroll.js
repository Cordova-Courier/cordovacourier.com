window.addEventListener('scroll', function () {
  const header = document.getElementById('site-header');
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
    header.classList.remove('transparent');
  } else {
    header.classList.remove('scrolled');
    header.classList.add('transparent');
  }
});
